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
import GoToTop from '@/components/GoToTop';

import getActivityAPI from '@/api/getActivityAPI';
import getScenicSpotAPI from '@/api/getScenicSpotAPI';
import getRestaurantAPI from '@/api/getRestaurantAPI';

import SEO from '@/utils/seo';

const Search = ({ type, area, keyword, classVal }) => {
    const router = useRouter();
    const { locale, push } = router;
    const { t } = useTranslation('common');

    let countyData = t('countyOptions.area', {
        returnObjects: true,
    }).filter((item) => area === item.value)[0];
    let searchedCountyText = countyData ? countyData.name : '';

    let fetchDataNumber = 12

    const [selectedValue, setSelectedValue] = useState(locale);
    const [inputValue, setInputValue] = useState('');
    const [selectedCountyText, setSelectedCountyText] = useState('');
    const [selectedCountyValue, setSelectedCountyValue] = useState('');
    const [classValue, setClassValue] = useState('')
    const [results, setResults] = useState([]);
    const [status, setStatus] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [skip, setSkip] = useState(0);
    const [isEnd, setIsEnd] = useState(false);
    const [TypeChange, setTypeChange] = useState(false)

    const handleSearch = () => {
        setSkip(0);
        let url = '/search?type=' + type;

        if (inputValue) {
            url += '&keyword=' + inputValue;
            // setInputValues(keyword, keyword);
        }

        if (selectedCountyValue) {
            url += '&area=' + selectedCountyValue;
        }

        if (classValue) {
            url += '&classVal=' + classValue;
        }

        if (!inputValue && !selectedCountyValue && !classValue) {
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
                        top: fetchDataNumber,
                        filter: keyword
                            ? `contains(ActivityName, '${keyword}')`
                            : classVal ? `contains(Class1, '${classVal}') or contains(Class2, '${classVal}')` : null,
                        area: area ? area : null,
                    });
                    break;
                case 'scenicSpot':
                    response = await getScenicSpotAPI({
                        top: fetchDataNumber,
                        filter: keyword
                            ? `contains(ScenicSpotName, '${keyword}')`
                            : classVal ? `contains(Class1, '${classVal}') or contains(Class2, '${classVal}') or contains(Class3, '${classVal}')` : null,
                        area: area ? area : null,
                    });
                    break;
                case 'restaurant':
                    response = await getRestaurantAPI({
                        top: fetchDataNumber,
                        filter: keyword
                            ? `contains(RestaurantName, '${keyword}')`
                            : classVal ? `contains(Class, '${classVal}')` : null,
                        area: area ? area : null,
                    });
                    break;
            }
            if (response.status === 'success') {
                setResults(prevItems => [...prevItems, ...response.data]);
                if (response.data.length === 0 || response.data.length < fetchDataNumber) {
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
                        top: fetchDataNumber,
                        skip: skip,
                        filter: keyword
                            ? `contains(ActivityName, '${keyword}')`
                            : classVal ? `contains(Class1, '${classVal}') or contains(Class2, '${classVal}')` : null,
                        area: area ? area : null,
                    });
                    break;
                case 'scenicSpot':
                    response = await getScenicSpotAPI({
                        top: fetchDataNumber,
                        skip: skip,
                        filter: keyword
                            ? `contains(ScenicSpotName, '${keyword}')`
                            : classVal ? `contains(Class1, '${classVal}') or contains(Class2, '${classVal}') or contains(Class3, '${classVal}')` : null,
                        area: area ? area : null,
                    });
                    break;
                case 'restaurant':
                    response = await getRestaurantAPI({
                        top: fetchDataNumber,
                        skip: skip,
                        filter: keyword
                            ? `contains(RestaurantName, '${keyword}')`
                            : classVal ? `contains(Class, '${classVal}')` : null,
                        area: area ? area : null,
                    });
                    break;
            }
            if (response.status === 'success') {
                setResults(prevItems => [...prevItems, ...response.data]);
                if (response.data.length === 0 || response.data.length < fetchDataNumber) {
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
            setSkip((prevSkip) => prevSkip + fetchDataNumber);
        }
    }, 500);

    useEffect(() => { fetchData() }, [area, keyword, classVal, type])

    useEffect(() => {
        let url = '/search?type=' + type;
        if (keyword) {
            url += '&keyword=' + keyword;
        }

        if (area) {
            url += '&area=' + area;
        }

        if (classVal) {
            url += '&classVal=' + classVal;
        }

        if (!keyword && !area && !classVal) {
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
        setClassValue(classVal)
    }, [area, keyword, classVal, type])

    useEffect(() => {
        if (skip > 0) {
            fetchMoreData()
        }
    }, [skip])

    useEffect(() => {
        let url = '/search?type=' + type;
        if (keyword) {
            url += '&keyword=' + keyword;
            // setInputValues(keyword, keyword);
        }

        if (area) {
            url += '&area=' + area;
        }

        if (classVal) {
            url += '&classVal=' + classVal;
        }

        if (!keyword && !area && !classVal) {
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
                <GoToTop />
                <NavBar
                    locale={locale}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                    setSkip={setSkip}
                />
                <BannerSearch
                    type={type}
                    setSelectedCountyText={setSelectedCountyText}
                    setSelectedCountyValue={setSelectedCountyValue}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    selectedCountyValue={selectedCountyValue}
                    handleSearch={handleSearch}
                    searchedCountyText={searchedCountyText}
                    setClassValue={setClassValue}
                    classValue={classValue}
                    locale={locale}
                />
                <SearchResults
                    fetchDataNumber={fetchDataNumber}
                    type={type}
                    results={results}
                    status={status}
                    isLoading={true}
                    isEnd={isEnd}
                    keyword={keyword}
                    area={area}
                    searchedCountyText={searchedCountyText}
                    classVal={classVal}
                />
                <Footer />
            </Container>
        </ThemeProvider>
    );
};

export async function getServerSideProps({ query, locale }) {
    const { type, keyword, area, classVal } = query;

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
            classVal: classVal || '',
        }
    }

}

export default Search;
