import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ThemeProvider from '@/lib/ThemeProvider';
import theme from '@/lib/theme';
import NavBar from '@/lib/NavBar';
import Footer from '@/components/Footer';
import BannerSearch from '@/features/search/components/BannerSearch';
import SearchResults from '@/features/search/components/SearchResults';

import getActivityAPI from '@/api/getActivityAPI';
import getScenicSpotAPI from '@/api/getScenicSpotAPI';
import getRestaurantAPI from '@/api/getRestaurantAPI';

import scrollToTop from '@/utils/scrollToTop';
import SEO from '@/utils/seo';

const Search = ({ typeStatus, typeData, type, area, keyword }) => {
    const router = useRouter();
    const { locale } = router;
    const { t } = useTranslation('common');

    const [selectedValue, setSelectedValue] = useState(locale);
    const [inputValue, setInputValue] = useState(keyword ? keyword : '');
    const [selectedCountyText, setSelectedCountyText] = useState('');
    const [selectedCountyValue, setSelectedCountyValue] = useState(
        area ? area : ''
    );
    const [searchedInputValue, setSearchedInputValue] = useState(
        keyword ? keyword : ''
    );
    const [searchedCountyText, setSearchedCountyText] = useState('');
    const [searchedCountyValue, setSearchedCountyValue] = useState(
        area ? area : ''
    );
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [skip, setSkip] = useState(0);
    const [error, setError] = useState(null);
    const [fillteredData, setFilteredData] = useState([]);
    const [isEnd, setIsEnd] = useState(false);

    const fetchFilteredData = async (keyword, area) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getScenicSpotAPI({
                top: 8,
                skip: skip,
                filter: keyword
                    ? `contains(ScenicSpotName, '${keyword}')`
                    : null,
                area: area ? area : null,
            });
            if (skip === 0) {
                setFilteredData(response.data);
                setResults(response.data);
            } else {
                setResults((fillteredData) => [
                    ...fillteredData,
                    ...response.data,
                ]);
            }
            if (response.data.length === 0 || response.data.length < 8) {
                setIsEnd(true);
            }
            setSkip((prevSkip) => prevSkip + 8);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setResults(typeData);
        setSkip(0);
        setResults([]);
        setFilteredData([]);
        setIsEnd(false);
        setIsLoading(false);

        let url = '/travel/search?type=' + type;

        if (keyword) {
            url += '&keyword=' + keyword;
            setInputValue(keyword);
            setSearchedInputValue(keyword);
        }

        if (area) {
            url += '&area=' + area;
            let chName = t('countyOptions.area', {
                returnObjects: true,
            }).filter((item) => area === item.value)[0].name;
            setSelectedCountyValue(area);
            setSearchedCountyValue(area);
            setSelectedCountyText(chName);
            setSearchedCountyText(chName);
        }

        if (area === '' && keyword === '') {
            url += '';
            setInputValue('');
            setSearchedInputValue('');
            setSelectedCountyValue('');
            setSearchedCountyValue('');
            setSelectedCountyText('');
            setSearchedCountyText('');
        }

        router.push(url, undefined, {
            locale: selectedValue,
        });
    }, []);

    useEffect(() => {
        // isLoading 初始值為 false
        const handleScroll = debounce(() => {
            // scrollBottom 剩餘的滾動高度
            const scrollBottom =
                document.documentElement.scrollHeight -
                (window.innerHeight + document.documentElement.scrollTop);
            if (scrollBottom < 1 && !isLoading && !isEnd) {
                if (area && keyword) {
                    fetchFilteredData(keyword, area);
                } else if (keyword) {
                    fetchFilteredData(keyword, null);
                } else if (area) {
                    fetchFilteredData(null, area);
                } else {
                    fetchFilteredData(null, null);
                }
            }
        });

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    useEffect(() => {
        // 有搜尋關鍵字或搜尋地址時，push url
        let url = '/travel/search?type=' + type;
        // if(!searchedInputValue || )
        if (searchedInputValue) {
            url += '&keyword=' + searchedInputValue;
        }

        if (searchedCountyValue) {
            url += '&area=' + searchedCountyValue;
        }

        if (searchedInputValue === '' && searchedCountyValue === '') {
            url += '';
        }

        router.push(url, undefined, {
            locale: selectedValue,
        });
        setSkip(0);
        setResults([]);
        setIsEnd(false);
    }, [searchedInputValue, searchedCountyValue]);

    useEffect(() => {
        setSkip(0);
        setResults([]);
        setIsEnd(false);
        if (area && keyword) {
            fetchFilteredData(keyword, area);
        } else if (keyword) {
            fetchFilteredData(keyword, '');
        } else if (area) {
            fetchFilteredData('', area);
        } else {
            fetchFilteredData('', '');
        }
    }, [area, keyword]);

    return (
        <ThemeProvider theme={theme}>
            <SEO title={t(`searchConfig.${type}BannerTitle`)} />
            <NavBar
                locale={locale}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
            />
            <BannerSearch
                type={type}
                bannerTitle={t(`searchConfig.${type}BannerTitle`)}
                selectedCountyText={selectedCountyText}
                setSelectedCountyText={setSelectedCountyText}
                setSelectedCountyValue={setSelectedCountyValue}
                setSearchedInputValue={setSearchedInputValue}
                setSearchedCountyText={setSearchedCountyText}
                setSearchedCountyValue={setSearchedCountyValue}
                inputValue={inputValue}
                setInputValue={setInputValue}
                selectedCountyValue={selectedCountyValue}
            />
            <SearchResults
                type={type}
                status={typeStatus}
                results={results}
                isLoading={isLoading}
                isEnd={isEnd}
                searchedInputValue={searchedInputValue}
                searchedCountyText={searchedCountyText}
            />
            <Footer />
        </ThemeProvider>
    );
};

export async function getServerSideProps({ query, locale }) {
    const { type, keyword, area } = query;

    let responseData;
    let typeData;
    let typeStatus;
    switch (type) {
        case 'activity':
            responseData = await getActivityAPI({
                top: 8,
                filter: null,
            });
            break;
        case 'scenicSpot':
            responseData = await getScenicSpotAPI({
                top: 8,
                filter: null,
            });
            break;
        case 'restaurant':
            responseData = await getRestaurantAPI({
                top: 8,
                filter: null,
            });
            break;
    }

    if (responseData?.status === 'success') {
        typeData = responseData.data;
        typeStatus = responseData.status;
    } else {
        return {
            notFound: true,
        };
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
            area: area || '',
            keyword: keyword || '',
        },
    };
    return returnData;
}

export default Search;
