import React, { useState, useEffect, useRef } from 'react';
import path from 'path';
import fs from 'fs/promises';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ThemeProvider from '@/lib/ThemeProvider';
import theme from '@/lib/theme';
import Footer from '@/components/Footer';
import NavBar from '@/lib/NavBar';

import BannerSearch from '@/features/search/components/BannerSearch';
import SearchResults from '@/features/search/components/SearchResults';

import getActivityAPI from '@/api/getActivityAPI';
import getScenicSpotAPI from '@/api/getScenicSpotAPI';
import getRestaurantAPI from '@/api/getRestaurantAPI';

import scrollToTop from '@/utils/scrollToTop';

const search = () => {
    const router = useRouter();
    const { locale, push, query } = useRouter();
    const { type, slug } = query; // TODO:slug 待確認用法

    const { t } = useTranslation('common');

    const [selectedValue, setSelectedValue] = useState(locale);
    const [typeStatus, setTypeStatus] = useState(undefined);
    const [typeData, setTypeData] = useState([]);
    const [typeError, setTypeError] = useState(null);
    const [bannerImgSrc, setBannerImgSrc] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [totalPages, setTotalPages] = useState(20);
    const [pageDataArray, setPageDataArray] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [inputCountyValue, setInputCountyValue] = useState('');
    const [searchedInputValue, setSearchedInputValue] = useState('');
    const [searchedInputCountyValue, setSearchedInputCountyValue] =
        useState('');
    const [results, setResults] = useState([]);
    const [selectedCounty, setSelectedCounty] = useState('');

    const handleData = (responseData) => {
        if (responseData?.status === 'success') {
            // handle success
            setTypeStatus('success');
            setTypeData(responseData?.data);
        } else if (responseData?.status === 'error') {
            // handle error (後端錯誤)
            setTypeStatus('error');
            setTypeError(responseData.desc);
        } else {
            // handle cancel (取消 call api)
            setTypeStatus('cancel');
        }
    };

    const handleActivityData = async () => {
        const responseData = await getActivityAPI({
            top: 30,
            filter: null,
        });
        handleData(responseData);
    };

    const handleScenicSpotData = async () => {
        const responseData = await getScenicSpotAPI({
            top: 30,
            filter: null,
        });
        handleData(responseData);
    };

    const handleRestaurantData = async () => {
        const responseData = await getRestaurantAPI({
            top: 30,
            filter: null,
        });
        handleData(responseData);
    };

    /**
     *
     * @param {*} a
     * @param {*} b
     * @returns duplicates 重複的物件
     */
    const findDuplicates = (a, b) => {
        const newArray = a.filter((item1) => {
            return b.some(
                (item2) =>
                    (item2.ScenicSpotID &&
                        item2.ScenicSpotID === item1.ScenicSpotID) ||
                    (item2.ActivityID &&
                        item2.ActivityID === item1.ActivityID) ||
                    (item2.RestaurantId &&
                        item2.RestaurantId === item1.RestaurantId)
            );
        });
        return newArray;
    };

    const handleFilteredResults = () => {
        const keyword = searchedInputValue.toLowerCase();
        const countyKeyword = searchedInputCountyValue.toLowerCase();

        // 關鍵字針對地址和活動名稱的搜尋
        const filteredKeyword = typeData.filter((item) => {
            const itemName =
                item?.ActivityName?.toLowerCase() ||
                item?.ScenicSpotName?.toLowerCase() ||
                item?.RestaurantName?.toLowerCase();
            const address = item?.Address?.toLowerCase() ?? '';
            return itemName.includes(keyword) || address?.includes(keyword);
        });

        // 地區關鍵字針對地址的搜尋
        const filteredCountyKeyword = typeData.filter((item) => {
            const address = item?.Address?.toLowerCase() ?? '';
            return address.includes(countyKeyword);
        });

        // 進階搜尋：用地區關鍵字搜尋結果，篩掉關鍵字搜尋結果，返回重複部分
        const mergedResults = findDuplicates(
            filteredKeyword,
            filteredCountyKeyword
        );

        let filteredResults = [];
        if (keyword && countyKeyword) {
            filteredResults = mergedResults;
        } else if (countyKeyword) {
            filteredResults = filteredCountyKeyword;
        } else if (keyword) {
            filteredResults = filteredKeyword;
        } else {
            filteredResults = typeData; // 如果沒有關鍵字輸入，返回所有資料
        }

        // if (filteredResults.length === 0) {
        //     // 處理沒有符合關鍵字的搜尋結果
        //     // 可以在這裡添加相應的處理邏輯，例如顯示提示訊息或執行其他操作
        // }

        setResults(filteredResults);
    };

    const typeHandlers = {
        activity: {
            handler: handleActivityData,
            bannerImgSrc: 'BannerActivity',
        },
        scenicSpot: {
            handler: handleScenicSpotData,
            bannerImgSrc: 'BannerScenicSpot',
        },
        restaurant: {
            handler: handleRestaurantData,
            bannerImgSrc: 'BannerRestaurant',
        },
    };

    useEffect(() => {
        // 當頁面載入時，回到頁面頂部
        scrollToTop(true);
        const typeHandler = typeHandlers[type];
        const { handler, bannerImgSrc } = typeHandler;
        handler();
        setBannerImgSrc(bannerImgSrc);
    }, [type]);

    useEffect(() => {
        handleFilteredResults();
    }, [typeData]);

    useEffect(() => {
        // 換頁時，回到頁面頂部
        // scrollToTop(true);
        /**
         * 每頁的資料
         */
        const chunkedData = Array.from(
            { length: Math.ceil(results.length / pageSize) },
            (_, index) =>
                results.slice(index * pageSize, (index + 1) * pageSize)
        );
        setPageDataArray(chunkedData[page - 1]);
        setTotalPages(results.length);

        /**
         * 處理不同情境(keyword,area,page)下的查詢參數
         * ex. http://localhost:3000/travel/search?type=activity&page=2
         */
        const query = {
            keyword: searchedInputValue,
            area: searchedInputCountyValue,
            // page: page > 1 ? page : undefined, // page>1，出現參數 page
        };

        const queryString = Object.entries(query)
            .filter(([key, value]) => value !== undefined && value !== '')
            .map(([key, value]) => `&${key}=${encodeURIComponent(value)}`)
            .join('');

        type &&
            router.push(
                `/travel/search?type=${type}${queryString}`,
                undefined,
                {
                    locale: selectedValue,
                    shallow: true,
                }
            );
    }, [page, results, selectedValue]);

    /**
     * 處理當頁碼不等於1時，有新的關鍵字和地區關鍵字重新搜尋
     */
    useEffect(() => {
        handleFilteredResults();
        setPage(1);
    }, [searchedInputValue, searchedInputCountyValue]);

    /**
     * TODO:
     * 1. 頁碼=1時，url 不顯示 page 參數，頁碼>2時，才顯示 -> done
     * 2. 換新頁碼、上一頁、下一頁時，回到最上方 -> done
     * 3. 有新搜尋關鍵字時，回到頁面最上方
     * 4. 當 url 有參數時，複製 url 再貼上，要顯示有參數的搜尋結果
     */
    return (
        <ThemeProvider theme={theme}>
            <NavBar
                locale={locale}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
            />
            <BannerSearch
                bannerTitle={t(`searchConfig.${type}BannerTitle`)}
                bannerImgSrc={bannerImgSrc}
                inputValue={inputValue}
                setInputValue={setInputValue}
                inputCountyValue={inputCountyValue}
                setInputCountyValue={setInputCountyValue}
                handleFilteredResults={handleFilteredResults}
                selectedCounty={selectedCounty}
                setSelectedCounty={setSelectedCounty}
                searchedInputValue={searchedInputValue}
                setSearchedInputValue={setSearchedInputValue}
                searchedInputCountyValue={searchedInputCountyValue}
                setSearchedInputCountyValue={setSearchedInputCountyValue}
            />
            <SearchResults
                status={typeStatus}
                searchedInputValue={searchedInputValue}
                searchedInputCountyValue={searchedInputCountyValue}
                results={results}
                pageDataArray={pageDataArray}
                page={page}
                pageSize={pageSize}
                totalPages={totalPages}
                setPage={setPage}
                type={type}
            />
            <Footer />
        </ThemeProvider>
    );
};

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'api_mapping',
                'common',
                'activityData',
                'scenicSpotData',
                'restaurantData',
            ])),
        },
    };
}

export default search;
