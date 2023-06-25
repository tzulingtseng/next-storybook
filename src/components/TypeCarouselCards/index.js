import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
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

import { useTranslation } from 'next-i18next';

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
const TypeCarouselCards = ({ type, lists }) => {
    let titleName;
    switch (type) {
        case 'activity':
            titleName = 'hotActivity'; // 熱門活動
            break;
        case 'scenicSpot':
            titleName = 'hotScenicSpot'; // 熱門景點
            break;
        case 'restaurant':
            titleName = 'hotRestaurant'; // 熱門美食
            break;
    }

    const swiperParams = {
        slidesPerView: 'auto', // 根据容器宽度自动调整每页显示的滑块数量
        // spaceBetween: '1rem', // 滑块之间的间距
        modules: [Pagination],
        navigation: false,
        pagination: { clickable: true, dynamicBullets: true },
    };
    const { t } = useTranslation('home');

    return (
        <>
            <CarouselContainer>
                <StyledTitleContainer>
                    {/* <StyledTitleText>{titleName}</StyledTitleText> */}
                    <StyledTitleText>
                        {t(`carouselConfig.${titleName}`)}
                    </StyledTitleText>
                    <StyledTitleLink>
                        <Link href={`/travel/search?type=${type}`}>
                            {' '}
                            {t(`carouselConfig.more`)}
                        </Link>
                    </StyledTitleLink>
                </StyledTitleContainer>
                <CarouselBox {...swiperParams}>
                    {lists &&
                        lists.map((item) => {
                            // console.log('lists', lists);
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
                            let Address = item?.Address ?? null;
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
                            // console.log('itemId', itemId);
                            return (
                                <StyledSwiperSlide key={itemId}>
                                    <Link
                                        href={`/travel/detail/${type}?id=${itemId}`}
                                    >
                                        <Card
                                            cover={
                                                PictureUrl1 ? (
                                                    <img
                                                        src={PictureUrl1}
                                                        alt="觀光"
                                                    />
                                                ) : (
                                                    <NoImage />
                                                )
                                            }
                                            children={
                                                <Meta
                                                    // avatarUrl={item.Picture.PictureUrl1}
                                                    title={t(
                                                        `carouselData.${itemId}.titleName`
                                                    )}
                                                    description={openTime}
                                                    address={
                                                        Address
                                                            ? t(
                                                                  `carouselData.${itemId}.address`
                                                              )
                                                            : t(
                                                                  `carouselData.moreDetails`
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
            </CarouselContainer>
        </>
    );
};

export default TypeCarouselCards;
