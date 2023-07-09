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
import breakpoint from '@/lib/constant/breakpoint';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import getScenicSpotAPI from '@/api/getScenicSpotAPI';
import getActivityAPI from '@/api/getActivityAPI';
import getRestaurantAPI from '@/api/getRestaurantAPI';

const BannerHomeWrapper = styled.div`
    width: 100%;
    position: relative;
    &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
    }
`;

const BannerHome = styled(Image)`
    width: 100%;
    height: auto;
    display: block;
`;

const BannerText = styled.div`
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: ${(props) => props.theme.colors.white};
    font-weight: 600;
    width: 100%;
    .title {
        font-size: ${(props) => props.theme.fontSize.xl};
    }
    ${breakpoint.mediaMD} {
        .title {
            font-size: ${(props) => props.theme.fontSize.xxl};
        }
    }
    .sub_title {
        font-size: ${(props) => props.theme.fontSize.lg};
    }
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
                <BannerHomeWrapper>
                    <BannerHome
                        src={BannerHomeSrc}
                        alt="banner"
                        priority={true}
                    />
                    <BannerText>
                        <div className="title">探索臺灣之美</div>
                        <div className="title"> 讓我們更親近這片土地</div>
                        <div className="sub_title">景點、 美食、 活動</div>
                    </BannerText>
                </BannerHomeWrapper>
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
