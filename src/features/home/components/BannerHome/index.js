import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import Image from 'next/image';
import BannerHomeSrcPC from '@/assets/images/banner-home-pc.jpg';
import BannerHomeSrcMb from '@/assets/images/banner-home-mb.jpg';
import BannerScenicSpotSrcPC from '@/assets/images/banner-scenicSpot-pc.jpg';
import BannerScenicSpotSrcMb from '@/assets/images/banner-scenicSpot-mb.jpg';
import BannerRestaurantSrcPC from '@/assets/images/banner-restaurant-pc.jpg';
import BannerRestaurantSrcMb from '@/assets/images/banner-restaurant-mb.jpg';
import BannerActivitySrcPC from '@/assets/images/banner-activity-pc.jpg';
import BannerActivitySrcMb from '@/assets/images/banner-activity-mb.jpg';
import breakpoint from '@/lib/constant/breakpoint';
import { useTranslation } from 'next-i18next';

const BannerHomeWrapper = styled.div`
    position: relative;
    background-position: center;
    background-size: cover;
`;

const BannerImg = styled(Image)`
    width: 100%;
    height: auto;
    &.show-pc {
        display: none;
    }
    &.show-mb {
        display: block;
    }
    ${breakpoint.mediaMD} {
        &.show-pc {
            display: block;
        }
        &.show-mb {
            display: none;
        }
    }
`;

const BannerTextContainer = styled.div`
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: ${(props) => props.theme.colors.white};
    font-weight: 600;
    max-width: 50rem;
    width: 90%;
    height: 70%;
    background-color: rgba(255,255,255,0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    // transition: transform 0.4s, opacity 0.4s;
    .title {
        white-space: pre-line;
        font-size: ${(props) => props.theme.fontSize.xl};
        text-shadow: 1px 1px 0 #444, 2px 2px 0 #444, 3px 3px 0 #444;
    }
    .sub_title {
        font-size: ${(props) => props.theme.fontSize.lg};
        text-shadow: 1px 1px 0 #444, 2px 2px 0 #444, 3px 3px 0 #444;
    }
    ${breakpoint.mediaMD} {
        width: 60%;
    }
`;

const SwiperContainer = styled.div`
    position: relative;
    width: 100%;
`;

const CarouselBox = styled(Swiper)`
    .swiper-pagination-bullet {
        width: 1rem;
        height: 1rem;
        background-color: ${(props) => props.theme.colors.white};
        opacity: 0.8;
    }
    .swiper-pagination-bullet-active {
        background-color: ${(props) => props.theme.colors.primary};
    }
`

const StyledSwiperSlide = styled(SwiperSlide)`
    &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: ${(props) => props.theme.colors.black};
        opacity: 0.1;
    }
`

const BannerHome = ({ locale }) => {
    const { t } = useTranslation('common');

    const swiperParams = {
        slidesPerView: 'auto', // 根據容器寬度自動調整每頁顯示的 slide 數量
        modules: [Navigation, Pagination],
        pagination: { clickable: true, dynamicBullets: true },
        navigation: false,
    };

    return (
        <BannerHomeWrapper>
            <SwiperContainer>
                <CarouselBox {...swiperParams}>
                    <StyledSwiperSlide>
                        <BannerImg
                            className="show-pc"
                            src={BannerHomeSrcPC}
                            alt="banner"
                            priority={true}
                        />
                        <BannerImg
                            className="show-mb"
                            src={BannerHomeSrcMb}
                            alt="banner"
                            priority={true}
                        />
                        <BannerTextContainer $locale={locale}>
                            <div>
                                <div className="title">{t('bannerHome.title_01')}</div>
                                {t('bannerHome.title_02') !== "" && <div className="title">{t('bannerHome.title_02')}</div>}
                                <div className="sub_title">{t('bannerHome.sub_title')}</div>
                            </div>
                        </BannerTextContainer >
                    </StyledSwiperSlide>
                    <StyledSwiperSlide>
                        <BannerImg
                            className="show-pc"
                            src={BannerScenicSpotSrcPC}
                            alt="banner"
                            priority={true}
                        />
                        <BannerImg
                            className="show-mb"
                            src={BannerScenicSpotSrcMb}
                            alt="banner"
                            priority={true}
                        />
                        <BannerTextContainer $locale={locale}>
                            <div>
                                <div className="title">
                                    {t(`searchConfig.scenicSpotBannerTitle`)}
                                </div>
                                <div className="sub_title">{t(`searchConfig.scenicSpotBannerSubTitle`)}</div>
                            </div>
                        </BannerTextContainer >
                    </StyledSwiperSlide>
                    <StyledSwiperSlide>
                        <BannerImg
                            className="show-pc"
                            src={BannerActivitySrcPC}
                            alt="banner"
                            priority={true}
                        />
                        <BannerImg
                            className="show-mb"
                            src={BannerActivitySrcMb}
                            alt="banner"
                            priority={true}
                        />
                        <BannerTextContainer $locale={locale}>
                            <div>
                                <div className="title">
                                    {t(`searchConfig.activityBannerTitle`)}
                                </div>
                                <div className="sub_title">{t(`searchConfig.activityBannerSubTitle`)}</div>
                            </div>
                        </BannerTextContainer >
                    </StyledSwiperSlide>
                    <StyledSwiperSlide>
                        <BannerImg
                            className="show-pc"
                            src={BannerRestaurantSrcPC}
                            alt="banner"
                            priority={true}
                        />
                        <BannerImg
                            className="show-mb"
                            src={BannerRestaurantSrcMb}
                            alt="banner"
                            priority={true}
                        />
                        <BannerTextContainer $locale={locale}>
                            <div>
                                <div className="title">
                                    {t(`searchConfig.restaurantBannerTitle`)}
                                </div>
                                <div className="sub_title">{t(`searchConfig.restaurantBannerSubTitle`)}</div>
                            </div>
                        </BannerTextContainer >
                    </StyledSwiperSlide>
                </CarouselBox>
            </SwiperContainer>
        </BannerHomeWrapper >
    );
};

export default BannerHome;
