import React, { Fragment } from 'react';
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

import { useTranslation } from 'next-i18next';

import NoImage from '@/components/NoImage';
import CardSkeleton from '../CardSkeleton';
import breakpoint from '@/lib/constant/breakpoint';

const CarouselContainer = styled.div``;

const CarouselBox = styled(Swiper)`
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
    width: 60%;
    margin-right: 1rem;
    ${breakpoint.mediaSM} {
        width: 40%;
    }
    ${breakpoint.mediaMD} {
        width: 28%;
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
const TypeCarouselCards = ({ status, type, lists }) => {
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
    const { t } = useTranslation('common');

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
                {/* TODO:優化寫法 */}
                <CarouselBox {...swiperParams}>
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
                        lists.map((item) => {
                            let PictureUrl1 =
                                item?.Picture?.PictureUrl1 ?? null;
                            let formattedTime =
                                moment(item?.StartTime, moment.ISO_8601)
                                    .tz('Asia/Taipei')
                                    .format('YYYY-MM-DD') +
                                ' ~ ' +
                                moment(item?.EndTime, moment.ISO_8601)
                                    .tz('Asia/Taipei')
                                    .format('YYYY-MM-DD');
                            let time = item?.OpenTime;
                            let openTime = time
                                ? t('carouselConfig.time')
                                : formattedTime;
                            let Address = item?.Address ?? null;
                            let description =
                                item?.Description ?? DescriptionDetail;
                            let itemId, itemName, type;
                            if (item?.ActivityID) {
                                itemId = item.ActivityID;
                                // itemName = item.ActivityName;
                                type = 'activity';
                            } else if (item?.ScenicSpotID) {
                                itemId = item.ScenicSpotID;
                                // itemName = item.ScenicSpotName;
                                type = 'scenicSpot';
                            } else if (item?.RestaurantID) {
                                itemId = item.RestaurantID;
                                // itemName = item.RestaurantName;
                                type = 'restaurant';
                            }
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
                                                        `${itemId}.titleName`,
                                                        { ns: `${type}Data` }
                                                    )}
                                                    description={t(
                                                        `${itemId}.description`,
                                                        {
                                                            ns: `${type}Data`,
                                                        }
                                                    )}
                                                    address={
                                                        Address
                                                            ? t(
                                                                  `${itemId}.address`,
                                                                  {
                                                                      ns: `${type}Data`,
                                                                  }
                                                              )
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
            </CarouselContainer>
        </>
    );
};

export default TypeCarouselCards;
