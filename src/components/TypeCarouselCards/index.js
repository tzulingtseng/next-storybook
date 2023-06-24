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

const CarouselContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    // height: 100%;
`;

const CarouselBox = styled(Swiper)`
    width: 100%;
    height: 100%;
    padding-bottom: 2.5rem;
    .swiper-pagination-bullet {
        width: 0.75rem;
        height: 0.75rem;
    }
    .swiper-pagination-bullet-active {
        background-color: ${(props) => props.theme.colors.primary};
    }
`;

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
`;

const StyledTitleLink = styled.div`
    color: ${(props) => props.theme.colors.danger};
    font-size: ${(props) => props.theme.fontSize.sm};
    &:after {
        content: ' >';
    }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
    width: auto;
    margin-right: 1rem;
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

const StyledButton = styled(Button)`
    width: 100%;
    margin-bottom: 1rem;
    font-size: ${(props) => props.theme.fontSize.sm};
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

    const swiperParams = {
        slidesPerView: 'auto', // 根据容器宽度自动调整每页显示的滑块数量
        // spaceBetween: '1rem', // 滑块之间的间距
        modules: [Pagination],
        navigation: false,
        pagination: { clickable: true, dynamicBullets: true },
    };

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
                <CarouselBox {...swiperParams}>
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
                                                    icon="fa-solid fa-location-dot"
                                                />
                                            }
                                            footer={
                                                <Actions>
                                                    <StyledButton variant="outlined">
                                                        查看詳情
                                                    </StyledButton>
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
