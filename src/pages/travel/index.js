// import Image from 'next/image';
import React, { useState, useEffect, Fragment } from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import BannerHomeSrc from '@/assets/images/banner-home.png';

import { Inter } from 'next/font/google';
import path from 'path';
import fs from 'fs/promises';

import SEO from '@/utils/seo';

import Link from 'next/link';
import ThemeProvider from '@/lib/ThemeProvider';
import theme from '@/lib/theme';
import NavBar from '@/lib/NavBar';
import Card from '@/lib/Card';
import Button from '@/lib/Button';
import { Icon } from '@/lib';
import Meta from '@/lib/Card/Meta';
import Container from '@/components/Container';
import Footer from '@/components/Footer';
import TypeCarouselCards from '@/components/TypeCarouselCards';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import getScenicSpotAPI from '@/api/getScenicSpotAPI';
import getActivityAPI from '@/api/getActivityAPI';
import getRestaurantAPI from '@/api/getRestaurantAPI';

const BannerHome = styled(Image)`
    width: 100%;
    height: auto;
`;

const Travel = ({
    scenicSpotData,
    scenicSpotStatus,
    activityData,
    activityStatus,
    restaurantData,
    restaurantStatus,
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const { locale, push } = useRouter();
    const [selectedValue, setSelectedValue] = useState(locale);
    const [selectLang, setSelectLang] = useState(true);
    const { t } = useTranslation('common');
    useEffect(() => {
        push('/travel', undefined, { locale: selectedValue });
    }, [selectedValue]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <SEO
                    title={t('title')}
                    keywords={t('keywords')}
                    description={t('description')}
                />
                <NavBar
                    locale={locale}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                    selectLang={selectLang}
                />
                {/* <BannerHome src={BannerHomeSrc} alt="banner" priority={true} /> */}
                <Container>
                    <TypeCarouselCards
                        lists={scenicSpotData}
                        type="scenicSpot"
                        status={scenicSpotStatus}
                    />

                    <TypeCarouselCards
                        lists={activityData}
                        type="activity"
                        status={activityStatus}
                    />

                    <TypeCarouselCards
                        lists={restaurantData}
                        type="restaurant"
                        status={restaurantStatus}
                    />
                </Container>
                <Footer />
            </ThemeProvider>
        </>
    );
};

export async function getStaticProps({ locale }) {
    const scenicSpotData = await getScenicSpotAPI({
        top: 10,
        filter: 'Picture/PictureUrl1 ne null',
    });
    const activityData = await getActivityAPI({
        top: 10,
        filter: 'Picture/PictureUrl1 ne null',
    });
    const restaurantData = await getRestaurantAPI({
        top: 10,
        filter: 'Picture/PictureUrl1 ne null',
    });
    const returnData = {
        props: {
            ...(await serverSideTranslations(locale, [
                'api_mapping',
                'common',
                'activityData',
                'scenicSpotData',
                'restaurantData',
            ])),
            scenicSpotData: scenicSpotData.data,
            scenicSpotStatus: scenicSpotData.status,
            activityData: activityData.data,
            activityStatus: activityData.status,
            restaurantData: restaurantData.data,
            restaurantStatus: restaurantData.status,
        },
        revalidate: 100,
    };
    return returnData;
}

export default Travel;
