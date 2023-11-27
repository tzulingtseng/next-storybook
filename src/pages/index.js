// import Image from 'next/image';
import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';

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
import Wrapper from '@/components/Wrapper';
import Footer from '@/components/Footer';
import TypeCarouselCards from '@/components/TypeCarouselCards';
import BannerHome from '@/features/home/components/BannerHome';
import GoToTop from '@/components/GoToTop';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getAuthorizationHeader } from '@/utils/getAuthorizationHeader';
import getScenicSpotAPI from '@/api/getScenicSpotAPI';
import getActivityAPI from '@/api/getActivityAPI';
import getRestaurantAPI from '@/api/getRestaurantAPI';

const StyledTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin: 1.5rem 0;
`;

const StyledTitleText = styled.div`
    color: ${(props) => props.theme.colors.primary};
    font-size: ${(props) => props.theme.fontSize.lg};
    font-weight: 600;
    display: flex;
    align-items: center;
`;

const StyledTitleIcon = styled(Icon)`
    margin-left: 0.5rem;
    font-size: 1.5rem;
`;

const StyledTitleLink = styled.div`
    color: ${(props) => props.theme.colors.danger};
    font-size: ${(props) => props.theme.fontSize.sm};
    &:after {
        content: ' >';
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
    const { t } = useTranslation('common');
    const [hasPagination, setHasPagination] = useState(false);

    useEffect(() => {
        push('/', undefined, { locale: selectedValue });
    }, [selectedValue]);

    let typeData;
    const handleType = (type) => {
        switch (type) {
            case 'activity':
                return (typeData = {
                    titleName: 'hotActivity', // 熱門活動
                    titleIcon: 'fa-solid fa-flag-checkered',
                });
            case 'scenicSpot':
                return (typeData = {
                    titleName: 'hotScenicSpot', // 熱門景點
                    titleIcon: 'fa-solid fa-tower-observation',
                });
            case 'restaurant':
                return (typeData = {
                    titleName: 'hotRestaurant', // 熱門美食
                    titleIcon: 'fa-regular fa-utensils',
                });
            default:
                console.log('No match title');
        }
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <SEO
                    title={t('title')}
                    keywords={t('keywords')}
                    description={t('description')}
                />
                <Container>
                    <GoToTop />
                    <NavBar
                        locale={locale}
                        selectedValue={selectedValue}
                        setSelectedValue={setSelectedValue}
                    />
                    <BannerHome locale={locale} />
                    <Wrapper>
                        <StyledTitleContainer>
                            <StyledTitleText>
                                {t(
                                    `carouselConfig.${
                                        handleType('scenicSpot').titleName
                                    }`
                                )}
                                <StyledTitleIcon
                                    icon={`${
                                        handleType('scenicSpot').titleIcon
                                    }`}
                                />
                            </StyledTitleText>
                            <StyledTitleLink>
                                <Link href={`/search?type=scenicSpot`}>
                                    {t(`carouselConfig.more`)}
                                </Link>
                            </StyledTitleLink>
                        </StyledTitleContainer>
                        <TypeCarouselCards
                            lists={scenicSpotData}
                            type="scenicSpot"
                            status={scenicSpotStatus}
                            hasPagination={true}
                        />
                        <StyledTitleContainer>
                            <StyledTitleText>
                                {t(
                                    `carouselConfig.${
                                        handleType('activity').titleName
                                    }`
                                )}
                                <StyledTitleIcon
                                    icon={`${handleType('activity').titleIcon}`}
                                />
                            </StyledTitleText>
                            <StyledTitleLink>
                                <Link href={`/search?type=activity`}>
                                    {t(`carouselConfig.more`)}
                                </Link>
                            </StyledTitleLink>
                        </StyledTitleContainer>
                        <TypeCarouselCards
                            lists={activityData}
                            type="activity"
                            status={activityStatus}
                            hasPagination={true}
                        />
                        <StyledTitleContainer>
                            <StyledTitleText>
                                {t(
                                    `carouselConfig.${
                                        handleType('restaurant').titleName
                                    }`
                                )}
                                <StyledTitleIcon
                                    icon={`${
                                        handleType('restaurant').titleIcon
                                    }`}
                                />
                            </StyledTitleText>
                            <StyledTitleLink>
                                <Link href={`/search?type=restaurant`}>
                                    {t(`carouselConfig.more`)}
                                </Link>
                            </StyledTitleLink>
                        </StyledTitleContainer>
                        <TypeCarouselCards
                            lists={restaurantData}
                            type="restaurant"
                            status={restaurantStatus}
                        />
                    </Wrapper>
                    <Footer />
                </Container>
            </ThemeProvider>
        </>
    );
};

export async function getStaticProps({ locale }) {
    const accessToken = await getAuthorizationHeader();

    try {
        const [
            scenicSpotResponseData,
            activityResponseData,
            restaurantResponseData,
        ] = await Promise.all([
            getScenicSpotAPI({
                top: 10,
                filter: 'Picture/PictureUrl1 ne null',
                accessToken,
            }),
            getActivityAPI({
                top: 10,
                filter: 'Picture/PictureUrl1 ne null',
                accessToken,
            }),
            getRestaurantAPI({
                top: 10,
                filter: 'Picture/PictureUrl1 ne null',
                accessToken,
            }),
        ]);

        if (
            scenicSpotResponseData.status === 'success' &&
            activityResponseData.status === 'success' &&
            restaurantResponseData.status === 'success'
        ) {
            const returnData = {
                props: {
                    ...(await serverSideTranslations(locale, [
                        'api_mapping',
                        'common',
                        'activityData',
                        'scenicSpotData',
                        'restaurantData',
                    ])),
                    scenicSpotData: scenicSpotResponseData.data,
                    scenicSpotStatus: scenicSpotResponseData.status,
                    activityData: activityResponseData.data,
                    activityStatus: activityResponseData.status,
                    restaurantData: restaurantResponseData.data,
                    restaurantStatus: restaurantResponseData.status,
                },
                revalidate: 100,
            };
            return returnData;
        } else {
            return {
                notFound: true,
            };
        }
    } catch (error) {
        console.error('擷取資料時發生錯誤：', error);
        return {
            notFound: true,
        };
    }
}

export default Travel;
