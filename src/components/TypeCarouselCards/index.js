import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment-timezone';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Card from '@/lib/Card';
import Meta from '@/lib/Card/Meta';
import Button from '@/lib/Button';

import NoImage from '@/components/NoImage';

// import { isObject } from '@/utils/isObject';
// import { dateTransfer } from '@/utils/dateTransfer';

const CarouselContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    // height: 100%;
`;

const CarouselBox = styled(Swiper)`
    width: 100%;
    height: 100%;
    // height: fit-content;
    // padding: 2px; // 加上才看得到 shadow
    padding-bottom: 40px;
    .swiper-pagination-bullet {
        width: 12px;
        height: 12px;
    }
    .swiper-pagination-bullet-active {
        background-color: #2f798c;
    }
`;

const StyledTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
`;

const StyledTitleText = styled.h2``;

const StyledTitleLink = styled.div``;

const StyledSwiperSlide = styled(SwiperSlide)`
    width: auto;
    // height: fit-content;
`;

const Actions = styled.div`
    padding: 8px 16px;
    color: #888;
    i {
        cursor: pointer;
    }
    & > *:not(:first-child) {
        margin-left: 20px;
    }
`;

const TypeCarouselCards = ({ type, lists }) => {
    let titleName;
    switch (type) {
        case 'activity':
            titleName = '熱門景點';
            break;
        case 'scenicSpot':
            titleName = '熱門活動';
            break;
        case 'restaurant':
            titleName = '熱門美食';
            break;
    }
    return (
        <>
            <CarouselContainer>
                <StyledTitleContainer>
                    <StyledTitleText>{titleName}</StyledTitleText>
                    <StyledTitleLink>
                        <Link href={`/travel/search?type=${type}`}>
                            更多{titleName}
                        </Link>
                    </StyledTitleLink>
                </StyledTitleContainer>
                <CarouselBox
                    modules={[Navigation, Pagination]}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    navigation={false}
                    spaceBetween={26.5}
                    slidesPerView={'auto'}
                >
                    {lists &&
                        lists.map((item) => {
                            let PictureUrl1 =
                                item?.Picture?.PictureUrl1 ?? null;
                            let openTime =
                                moment(item?.StartTime, moment.ISO_8601)
                                    .tz('Asia/Taipei')
                                    .format('YYYY-MM-DD') +
                                ' ~ ' +
                                moment(item?.EndTime, moment.ISO_8601)
                                    .tz('Asia/Taipei')
                                    .format('YYYY-MM-DD');
                            let Address = item?.Address ?? '詳見官網';
                            let itemId, itemName, type;
                            if (item?.ActivityID) {
                                itemId = item.ActivityID;
                                itemName = item.ActivityName;
                                type = 'activitiy';
                            } else if (item?.ScenicSpotID) {
                                itemId = item.ScenicSpotID;
                                itemName = item.ScenicSpotName;
                                type = 'scenicSpot';
                            } else if (item?.RestaurantID) {
                                itemId = item.RestaurantID;
                                itemName = item.RestaurantName;
                                type = 'restaurant';
                            }
                            return (
                                <StyledSwiperSlide key={item.ActivityID}>
                                    <Link
                                        href={`/travel/detail/${type}?id=${itemId}`}
                                    >
                                        <Card
                                            cover={
                                                PictureUrl1 ? (
                                                    <img
                                                        src={PictureUrl1}
                                                        alt={itemName}
                                                    />
                                                ) : (
                                                    <NoImage />
                                                )
                                            }
                                            children={
                                                <Meta
                                                    // avatarUrl={item.Picture.PictureUrl1}
                                                    title={itemName}
                                                    description={openTime}
                                                    address={Address}
                                                    text="開放時間"
                                                    icon="fa-solid fa-thumbs-up"
                                                />
                                            }
                                            footer={
                                                <Actions>
                                                    <Button
                                                        style={{
                                                            width: '100%',
                                                            marginBottom:
                                                                '16px',
                                                        }}
                                                        variant="outlined"
                                                    >
                                                        查看詳情
                                                    </Button>
                                                </Actions>
                                            }
                                        ></Card>
                                    </Link>
                                </StyledSwiperSlide>
                            );
                        })}
                </CarouselBox>
            </CarouselContainer>
        </>
    );
};

export default TypeCarouselCards;
