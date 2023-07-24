import React, { Fragment, useRef, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment-timezone';
import Link from 'next/link';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Card from '@/lib/Card';
import Meta from '@/lib/Card/Meta';
import Button from '@/lib/Button';
import Icon from '@/lib/Icon';

import { useTranslation } from 'next-i18next';
import transferTime from '@/utils/transferTime';
import convertGoogleDriveURL from '@/utils/convertGoogleDriveURL';

import NoImage from '@/components/NoImage';
import CardSkeleton from '../CardSkeleton';
import breakpoint from '@/lib/constant/breakpoint';

const CarouselContainer = styled.div`
    .swiper-button-prev,
    .swiper-button-next {
        display: none;
    }
`;

const CarouselBox = styled(Swiper)`
    padding-bottom: 3rem;
    .swiper-pagination-bullet {
        width: 1rem;
        height: 1rem;
    }
    .swiper-pagination-bullet-active {
        background-color: ${(props) => props.theme.colors.primary};
    }
`;

const SwiperContainer = styled.div`
    position: relative;
    width: 100%;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
    width: 88%;
    margin-right: 1rem;
    ${breakpoint.mediaSM} {
        width: 46%;
    }
    ${breakpoint.mediaMD} {
        width: 33%;
    }
    ${breakpoint.mediaLG} {
        width: 25%;
    }
`;

const Actions = styled.div`
    padding: 0.5rem 1rem;
    color: #888;
    i {
        cursor: pointer;
    }
    & > *:not(:first-child) {
        margin-left: 1rem;
    }
`;

const StyledButton = styled(Button)`
    width: 100%;
    margin-bottom: 1rem;
    font-size: ${(props) => props.theme.fontSize.sm};
`;

const SwiperArrowButton = styled.div`
    ${breakpoint.mediaLG} {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 1rem;
        font-family: swiper-icons;
        cursor: pointer;
        color: ${(props) => props.theme.colors.black};
        width: 2.5rem;
        height: 2.5rem;
        background-color: ${(props) => props.theme.colors.white};
        box-shadow: 0 4px 10px 0 rgba(60, 64, 67, 0.2);
        border-radius: 100%;
        justify-content: center;
        align-items: center;
        z-index: 1;
        &::after {
            position: relative;
        }
        &.button-prev {
            display: ${(props) => (props.$isBeginning ? 'none' : 'flex')};
            left: -3rem;
            &::after {
                content: 'prev';
            }
        }
        &.button-next {
            display: ${(props) => (props.$isEnd ? 'none' : 'flex')};
            right: -3rem;
            &::after {
                content: 'next';
            }
        }
    }
`;

const TypeCarouselCards = ({ status, type, lists, detailBageText, hasPagination }) => {
    const swiperRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const swiperParams = {
        slidesPerView: 'auto', // 根據容器寬度自動調整每頁顯示的 slide 數量
        modules: [Navigation, Pagination],
        pagination: { clickable: true, dynamicBullets: true },
        // navigation: {
        //     nextEl: `#swiper_control_${type} .button-next`,
        //     preEl: `#swiper_control_${type} .button-prev`,
        // },
        navigation: true,
        observer: true,
        observeParents: true,
    };

    useEffect(() => {
        if (lists && lists.length < 4) {
            setIsBeginning(true)
            setIsEnd(true)
            hasPagination = false
        } else {
            setIsBeginning(true)
            setIsEnd(false)
        }
    }, [])

    const { t } = useTranslation('common');

    return (
        <>
            <SwiperContainer id={`swiper_control_${type}`}>
                <CarouselContainer>
                    {/* TODO:優化寫法 */}
                    <CarouselBox
                        ref={swiperRef}
                        {...swiperParams}
                        onReachBeginning={() => {
                            setIsBeginning(true);
                            setIsEnd(false);
                        }}
                        onReachEnd={() => {
                            setIsEnd(true);
                            setIsBeginning(false)
                        }}
                    >
                        {(status === undefined ||
                            status === 'loading' ||
                            status === 'cancel') &&
                            Array(10)
                                .fill(0)
                                .map((item, i) => (
                                    <StyledSwiperSlide key={i}>
                                        <CardSkeleton />
                                    </StyledSwiperSlide>
                                ))}
                        {status === 'success' &&
                            lists &&
                            lists.map((item, i) => {
                                const {
                                    Picture: { PictureUrl1 },
                                    OpenTime,
                                    StartTime,
                                    EndTime,
                                    ActivityID,
                                    ScenicSpotID,
                                    RestaurantID,
                                    Address,
                                    Class, Class1, Class2, Class3,
                                } = item;

                                let transferedTime = transferTime(
                                    OpenTime,
                                    StartTime,
                                    EndTime
                                );
                                let convertImgUrl =
                                    convertGoogleDriveURL(PictureUrl1);
                                let classData, itemId, itemName;
                                switch (type) {
                                    case 'scenicSpot':
                                        classData = ["文化類", "生態類", "遊憩類"]
                                        itemId = item.ScenicSpotID;
                                        itemName = item.ScenicSpotName;
                                        break;
                                    case 'activity':
                                        classData = ["遊憩活動", "年度活動", "藝文活動"]
                                        itemId = item.ActivityID;
                                        itemName = item.ActivityName;
                                        break;
                                    case 'restaurant':
                                        classData = ["地方特產", "異國料理", "中式美食"]
                                        itemId = item.RestaurantID;
                                        itemName = item.RestaurantName;
                                        break;
                                }
                                let classArr = []

                                if (Class || Class1 || Class2 || Class3) {
                                    classArr.push(Class, Class1, Class2, Class3);
                                }
                                const filterClass = classData && classData.filter(item => classArr.includes(item))[0];

                                return (
                                    <StyledSwiperSlide key={itemId}>
                                        <Link
                                            href={`/detail/${type}?id=${itemId}`}
                                        >
                                            <Card
                                                cover={
                                                    convertImgUrl ? (
                                                        <img
                                                            src={convertImgUrl}
                                                            alt="觀光"
                                                        />
                                                    ) : (
                                                        <NoImage />
                                                    )
                                                }
                                                bageText={detailBageText || filterClass}
                                                children={
                                                    <Meta
                                                        // avatarUrl={item.Picture.PictureUrl1}
                                                        // title={t(
                                                        //     `${itemId}.titleName`,
                                                        //     {
                                                        //         ns: `${type}Data`,
                                                        //     }
                                                        // )}
                                                        title={itemName}
                                                        description={
                                                            transferedTime ===
                                                                'allDay'
                                                                ? t(
                                                                    'carouselConfig.allDay'
                                                                )
                                                                : transferedTime ===
                                                                    'moreDetails'
                                                                    ? t(
                                                                        'carouselConfig.moreDetails'
                                                                    )
                                                                    : transferedTime
                                                        }
                                                        address={
                                                            Address
                                                                ?
                                                                // t(
                                                                //     `${itemId}.address`,
                                                                //     {
                                                                //         ns: `${type}Data`,
                                                                //     }
                                                                // )
                                                                Address
                                                                : t(
                                                                    `carouselConfig.moreDetails`
                                                                )
                                                        }
                                                        text={t(
                                                            `carouselConfig.openTime`
                                                        )}
                                                        icon="fa-solid fa-location-dot"
                                                    />
                                                }
                                                footer={
                                                    <Actions>
                                                        <StyledButton variant="outlined">
                                                            {t(
                                                                `carouselConfig.buttonText`
                                                            )}
                                                        </StyledButton>
                                                    </Actions>
                                                }
                                            ></Card>
                                        </Link>
                                    </StyledSwiperSlide>
                                );
                            })}
                    </CarouselBox>
                    {/* 下一個箭頭 */}
                    <SwiperArrowButton
                        className="button-next"
                        $isEnd={isEnd}
                        onClick={() => {
                            swiperRef.current.swiper.slideNext();
                            setIsBeginning(false)
                        }}
                    ></SwiperArrowButton>
                    {/* 上一個箭頭 */}
                    <SwiperArrowButton
                        className="button-prev"
                        $isBeginning={isBeginning}
                        onClick={() => {
                            swiperRef.current.swiper.slidePrev();
                            setIsEnd(false)
                        }}
                    ></SwiperArrowButton>
                </CarouselContainer>
            </SwiperContainer>
        </>
    );
};

export default TypeCarouselCards;
