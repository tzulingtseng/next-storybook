import React, { useState, useEffect } from 'react';
import { throttle } from 'lodash';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ThemeProvider from '@/lib/ThemeProvider';
import theme from '@/lib/theme';
import NavBar from '@/lib/NavBar';
import Container from '@/components/Container';
import Footer from '@/components/Footer';
import BannerSearch from '@/features/search/components/BannerSearch';
import SearchResults from '@/features/search/components/SearchResults';

import getActivityAPI from '@/api/getActivityAPI';
import getScenicSpotAPI from '@/api/getScenicSpotAPI';
import getRestaurantAPI from '@/api/getRestaurantAPI';

import SEO from '@/utils/seo';

const Search = ({ type, area, keyword }) => {
    const router = useRouter();
    const { locale, push } = router;
    const { t } = useTranslation('common');

    let countyData = t('countyOptions.area', {
        returnObjects: true,
    }).filter((item) => area === item.value)[0];
    let searchedCountyText = countyData ? countyData.name : '';

    const [selectedValue, setSelectedValue] = useState(locale);
    const [inputValue, setInputValue] = useState('');
    const [selectedCountyText, setSelectedCountyText] = useState('');
    const [selectedCountyValue, setSelectedCountyValue] = useState('');
    const [results, setResults] = useState([]);
    const [status, setStatus] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [skip, setSkip] = useState(0);
    const [isEnd, setIsEnd] = useState(false);
    const [TypeChange, setTypeChange] = useState(false)

    const handleSearch = () => {
        setSkip(0);
        let url = '/travel/search?type=' + type;

        if (inputValue) {
            url += '&keyword=' + inputValue;
            // setInputValues(keyword, keyword);
        }

        if (selectedCountyValue) {
            url += '&area=' + selectedCountyValue;
        }

        if (!inputValue && !selectedCountyValue) {
            url += '';
        }
        router.push(url, undefined, {
            locale: selectedValue,
        });
    }

    const fetchData = async () => {
        setIsLoading(true);
        setStatus('')
        try {
            let response;
            switch (type) {
                case 'activity':
                    response = await getActivityAPI({
                        top: 8,
                        filter: keyword
                            ? `contains(ActivityName, '${keyword}')`
                            : null,
                        area: area ? area : null,
                    });
                    break;
                case 'scenicSpot':
                    response = await getScenicSpotAPI({
                        top: 8,
                        filter: keyword
                            ? `contains(ScenicSpotName, '${keyword}')`
                            : null,
                        area: area ? area : null,
                    });
                    break;
                case 'restaurant':
                    response = await getRestaurantAPI({
                        top: 8,
                        filter: keyword
                            ? `contains(RestaurantName, '${keyword}')`
                            : null,
                        area: area ? area : null,
                    });
                    break;
            }
            if (response.status === 'success') {
                setResults(prevItems => [...prevItems, ...response.data]);
                if (response.data.length === 0 || response.data.length < 8) {
                    setIsEnd(true);
                }
                setStatus(response.status)
            }
        } catch (error) {
            console.error(error)
            setStatus(response?.status);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchMoreData = async () => {
        setIsLoading(true);
        setStatus('')
        try {
            let response;
            switch (type) {
                case 'activity':
                    response = await getActivityAPI({
                        top: 8,
                        skip: skip,
                        filter: keyword
                            ? `contains(ActivityName, '${keyword}')`
                            : null,
                        area: area ? area : null,
                    });
                    break;
                case 'scenicSpot':
                    response = await getScenicSpotAPI({
                        top: 8,
                        skip: skip,
                        filter: keyword
                            ? `contains(ScenicSpotName, '${keyword}')`
                            : null,
                        area: area ? area : null,
                    });
                    break;
                case 'restaurant':
                    response = await getRestaurantAPI({
                        top: 8,
                        skip: skip,
                        filter: keyword
                            ? `contains(RestaurantName, '${keyword}')`
                            : null,
                        area: area ? area : null,
                    });
                    break;
            }
            if (response.status === 'success') {
                setResults(prevItems => [...prevItems, ...response.data]);
                if (response.data.length === 0 || response.data.length < 8) {
                    console.log('setIsEnd');
                    setIsEnd(true);
                }
                setStatus(response.status)
            }
        } catch (error) {
            console.error(error)
            setStatus(response?.status);
        } finally {
            setIsLoading(false);
        }
    }

    const handleScroll = throttle(() => {
        const scrollBottom =
            document.documentElement.scrollHeight -
            (window.innerHeight + document.documentElement.scrollTop);
        if (scrollBottom < 100 && !isLoading && !isEnd) {
            setSkip((prevSkip) => prevSkip + 8);
        }
    }, 500);

    useEffect(() => { fetchData() }, [area, keyword, type])

    useEffect(() => {
        let url = '/travel/search?type=' + type;
        if (keyword) {
            url += '&keyword=' + keyword;
            // setInputValues(keyword, keyword);
        }

        if (area) {
            url += '&area=' + area;
        }

        if (!keyword && !area) {
            url += '';
        }
        router.push(url, undefined, {
            locale: selectedValue,
        });
        setSkip(0)
        setTypeChange(!TypeChange)
        setResults([])
        setIsEnd(false)
        setSelectedCountyValue(area)
        setSelectedCountyText(searchedCountyText)
        setInputValue(keyword)
    }, [area, keyword, type])

    useEffect(() => {
        if (skip > 0) {
            fetchMoreData()
        }
    }, [skip])

    useEffect(() => {
        let url = '/travel/search?type=' + type;
        if (keyword) {
            url += '&keyword=' + keyword;
            // setInputValues(keyword, keyword);
        }

        if (area) {
            url += '&area=' + area;
        }

        if (!keyword && !area) {
            url += '';
        }
        router.push(url, undefined, {
            locale: selectedValue,
        });
    }, [selectedValue])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    return (
        <ThemeProvider theme={theme}>
            <SEO title={t(`searchConfig.${type}BannerTitle`)} />
            <Container>
                <NavBar
                    locale={locale}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                    setSkip={setSkip}
                />
                <BannerSearch
                    type={type}
                    bannerTitle={t(`searchConfig.${type}BannerTitle`)}
                    selectedCountyText={selectedCountyText}
                    setSelectedCountyText={setSelectedCountyText}
                    setSelectedCountyValue={setSelectedCountyValue}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    selectedCountyValue={selectedCountyValue}
                    handleSearch={handleSearch}
                    searchedCountyText={searchedCountyText}
                />
                <SearchResults
                    type={type}
                    results={results}
                    status={status}
                    isLoading={isLoading}
                    isEnd={isEnd}
                    keyword={keyword}
                    area={area}
                    searchedCountyText={searchedCountyText}
                />
                <Footer />
            </Container>
        </ThemeProvider>
    );
};

export async function getServerSideProps({ query, locale }) {
    const { type, keyword, area } = query;

    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'api_mapping',
                'common',
                'activityData',
                'scenicSpotData',
                'restaurantData',
            ])),
            type,
            keyword: keyword || '',
            area: area || '',
        }
    }

}

export default Search;
