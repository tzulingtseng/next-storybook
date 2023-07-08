import React, { useState, useEffect } from 'react';
import path from 'path';
import fs from 'fs/promises';

import useGetActivity from '@/features/home/hooks/useGetActivity';
import useGetScenicSpot from '@/features/home/hooks/useGetScenicSpot';
import useGetRestaurant from '@/features/home/hooks/useGetRestaurant';

import getActivityAPI from '@/api/getActivityAPI';
import getScenicSpotAPI from '@/api/getScenicSpotAPI';
import getRestaurantAPI from '@/api/getRestaurantAPI';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ThemeProvider from '@/lib/ThemeProvider';
import theme from '@/lib/theme';
import Footer from '@/components/Footer';
import NavBar from '@/lib/NavBar';

import BannerSearch from '@/features/search/components/BannerSearch';
import SearchResults from '@/features/search/components/SearchResults';

import scrollToTop from '@/utils/scrollToTop';
import transferTime from '@/utils/transferTime';

const search = ({ typeStatus, typeData, type }) => {
    const router = useRouter();
    const { locale, push, query } = useRouter();
    console.log('type', type);
    const { t } = useTranslation('common');

    const [hasMore, setHasMore] = useState(true);

    const [selectedValue, setSelectedValue] = useState(locale);
    const [selectedCounty, setSelectedCounty] = useState('');
    // const [typeStatus, setTypeStatus] = useState(undefined);
    // const [typeData, setTypeData] = useState([]);
    const [typeError, setTypeError] = useState(null);
    const [bannerImgSrc, setBannerImgSrc] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [totalPages, setTotalPages] = useState(20);
    const [PageDataArray, setPageDataArray] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [inputCountyValue, setInputCountyValue] = useState('');
    const [searchedInputValue, setSearchedInputValue] = useState('');
    const [searchedInputCountyValue, setSearchedInputCountyValue] =
        useState('');
    const [results, setResults] = useState([]);
    const [hasResults, setHasResults] = useState(true);
    // const [topNum, setTopNum] = useState(8);
    // const [skipNum, setSkipNum] = useState(0);
    const [times, setTimes] = useState(0);

    useEffect(() => {
        setResults(typeData);
    }, []);

    const fetchMoreNum = () => {
        // if (searchedInputValue || searchedInputCountyValue) {
        //     fetchMoreData();
        // }
        setTimes(times + 1);
    };

    useEffect(() => {
        if (searchedInputValue || searchedInputCountyValue) {
            fetchMoreKeywordData();
        } else {
            fetchMoreData();
        }
    }, [times]);

    const fetchMoreData = async () => {
        if (results.length < 20 || results.length === 20) {
            let skipNum = 8 * times;
            const moreData = await getActivityAPI({
                top: 8,
                skip: skipNum,
                filter: null,
            });
            setResults(results.concat(moreData.data));
            console.log('moreData', moreData);
        } else {
            setHasMore(false);
        }
    };
    const fetchMoreKeywordData = async () => {
        if (results.length < 8 || results.length === 8) {
            setHasMore(false);
        } else {
            console.log('fetchMoreKeywordData');
            let skipNum = results.length;
            const moreData = await getActivityAPI({
                top: 24,
                skip: skipNum,
                filter: `contains(Address, '${searchedInputCountyValue}')`,
            });
            setResults(results.concat(moreData.data));
            console.log('moreData', moreData);
        }
    };

    const handleFilteredResults = () => {
        setSearchedInputValue(inputValue);
        setSearchedInputCountyValue(inputCountyValue);
    };

    useEffect(() => {
        if (searchedInputValue || searchedInputCountyValue) {
            (async () => {
                const filteredData = await getActivityAPI({
                    top: 24,
                    filter: `contains(Address, '${searchedInputCountyValue}')`,
                });
                setResults(filteredData.data);
            })();
        }
    }, [searchedInputValue, searchedInputCountyValue]);

    const typeHandlers = {
        activity: {
            // handler: handleActivityData,
            bannerImgSrc: 'BannerActivity',
        },
        scenicSpot: {
            // handler: handleScenicSpotData,
            bannerImgSrc: 'BannerScenicSpot',
        },
        restaurant: {
            // handler: handleRestaurantData,
            bannerImgSrc: 'BannerRestaurant',
        },
    };

    useEffect(() => {
        if (!type) return;
        const typeHandler = typeHandlers[type];
        const { bannerImgSrc } = typeHandler;
        setBannerImgSrc(bannerImgSrc);
    }, [type]);

    // useEffect(() => {
    //     // 當頁面載入時，回到頁面頂部
    //     scrollToTop(true);
    //     if (typeData.length === 0) return;
    //     handleFilteredResults();
    // }, [typeData]);

    // useEffect(() => {
    //     // 換頁時，回到頁面頂部
    //     scrollToTop(true);
    //     /**
    //      * 每頁的資料
    //      */
    //     const chunkedData = Array.from(
    //         { length: Math.ceil(results.length / pageSize) },
    //         (_, index) =>
    //             results.slice(index * pageSize, (index + 1) * pageSize)
    //     );
    //     setPageDataArray(chunkedData[page - 1]);
    //     setTotalPages(results.length);
    // }, [results, page]);

    // useEffect(() => {
    //     /**
    //      * 有新的關鍵字和地區關鍵字重新搜尋
    //      */
    //     handleFilteredResults();
    //     /**
    //      * 處理不同情境(keyword,area,page)下的查詢參數
    //      * ex. http://localhost:3000/travel/search?type=activity&page=2
    //      */
    //     const query = {
    //         keyword: searchedInputValue,
    //         area: searchedInputCountyValue,
    //         // page: page > 1 ? page : undefined, // page>1，出現參數 page
    //     };
    //     const queryString = Object.entries(query)
    //         .filter(([key, value]) => value !== undefined && value !== '')
    //         .map(([key, value]) => `&${key}=${encodeURIComponent(value)}`)
    //         .join('');

    //     type &&
    //         router.push(
    //             `/travel/search?type=${type}${queryString}`,
    //             undefined,
    //             {
    //                 locale: selectedValue,
    //             }
    //         );
    // }, [searchedInputValue, searchedInputCountyValue, selectedValue]);

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
                setSearchedInputCountyValue={setSearchedInputCountyValue}
                searchedInputCountyValue={searchedInputCountyValue}
            />
            <SearchResults
                status={typeStatus}
                searchedInputValue={searchedInputValue}
                searchedInputCountyValue={searchedInputCountyValue}
                results={results}
                // page={page}
                // pageSize={pageSize}
                // totalPages={totalPages}
                setPage={setPage}
                type={type}
                hasMore={hasMore}
                setHasMore={setHasMore}
                fetchMoreData={fetchMoreData}
                fetchMoreNum={fetchMoreNum}
            />
            <Footer />
        </ThemeProvider>
    );
};

export async function getServerSideProps({ query, locale }) {
    const { type } = query;
    let responseData;
    let typeData;
    let typeStatus;
    switch (type) {
        case 'activity':
            responseData = await getActivityAPI({
                top: 8,
                filter: null,
            });
            if (responseData?.status === 'success') {
                typeData = responseData.data;
                typeStatus = responseData.status;
            } else {
                // handle error (後端錯誤) -> not found page(404 page)
                // TODO:為啥用 notFound 處理錯誤
                return {
                    notFound: true,
                };
            }
            break;
        case 'scenicSpot':
            responseData = await getScenicSpotAPI({
                top: 8,
                filter: null,
            });
            if (responseData?.status === 'success') {
                typeData = responseData.data;
                typeStatus = responseData.status;
            } else {
                // handle error (後端錯誤) -> not found page(404 page)
                // TODO:為啥用 notFound 處理錯誤
                return {
                    notFound: true,
                };
            }
            break;
        case 'restaurant':
            responseData = await getRestaurantAPI({
                top: 8,
                filter: null,
            });
            if (responseData?.status === 'success') {
                typeData = responseData.data;
                typeStatus = responseData.status;
            } else {
                // handle error (後端錯誤) -> not found page(404 page)
                // TODO:為啥用 notFound 處理錯誤
                return {
                    notFound: true,
                };
            }
            break;
    }

    const returnData = {
        props: {
            ...(await serverSideTranslations(locale, [
                'api_mapping',
                'common',
                'activityData',
                'scenicSpotData',
                'restaurantData',
            ])),
            typeData,
            typeStatus,
            type,
        },
    };
    return returnData;
}

export default search;
