// import Image from 'next/image';
import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import BannerHomeSrc from '@/assets/images/banner-home.png';

import { Inter } from 'next/font/google';
import path from 'path';
import fs from 'fs/promises';

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

import useGetActivity from '@/features/home/hooks/useGetActivity';
import useGetScenicSpot from '@/features/home/hooks/useGetScenicSpot';
import useGetRestaurant from '@/features/home/hooks/useGetRestaurant';

const BannerHome = styled(Image)`
    width: 100%;
    height: auto;
`;

const Travel = (props) => {
    const { locale, locales, push } = useRouter();
    const changeLanguage = (l) => () => {
        push('/', undefined, { locale: l });
        // push('/about', undefined, { locale: l });
    };
    const { t } = useTranslation('home');

    const {
        status: activityStatus,
        data: activityData,
        error: activityError,
    } = useGetActivity({ top: 10, filter: 'Picture/PictureUrl1 ne null' });

    // const {
    //     status: scenicSpotStatus,
    //     data: scenicSpotData,
    //     error: scenicSpotError,
    // } = useGetScenicSpot({ top: 10, filter: 'Picture/PictureUrl1 ne null' });

    // const {
    //     status: restaurantStatus,
    //     data: restaurantData,
    //     error: restaurantError,
    // } = useGetRestaurant({ top: 10, filter: 'Picture/PictureUrl1 ne null' });

    return (
        <>
            <ThemeProvider theme={theme}>
                <NavBar locale={locale}></NavBar>
                {/* <h1>{t('title')}</h1>
                <div>
                    <h3>With Link</h3>
                    <h1>Choose your locale:</h1>
                    {locales.map((l) => (
                        <button key={l}>
                            <Link href={`/travel`} locale={l}>
                                {l}
                            </Link>
                        </button>
                    ))}
                </div> */}
                <BannerHome
                    src={BannerHomeSrc}
                    alt="首頁 banner"
                    priority={true}
                />
                <Container>
                    {activityStatus === 'success' && (
                        <TypeCarouselCards
                            lists={activityData}
                            type="activity"
                        />
                    )}
                    {/* {scenicSpotStatus === 'success' && (
                        <TypeCarouselCards
                            lists={scenicSpotData}
                            type="scenicSpot"
                        />
                    )} */}
                    {/* {restaurantStatus === 'success' && (
                        <TypeCarouselCards
                        // lists={restaurantData}
                        // type="restaurant"
                        />
                    )} */}
                </Container>
                <Footer></Footer>
            </ThemeProvider>
        </>
    );
};

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'common',
                'about',
                'home',
            ])),
        },
    };
}

export default Travel;
