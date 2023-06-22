import React from 'react';
import styled, { css } from 'styled-components';
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

import { isObject } from '@/utils/isObject';
import { dateTransfer } from '@/utils/dateTransfer';

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

const ActivityCarouselCards = ({ lists }) => {
    return (
        <>
            <CarouselContainer>
                <CarouselBox
                    modules={[Navigation, Pagination]}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    navigation={false}
                    spaceBetween={20}
                    slidesPerView={'auto'}
                >
                    {lists &&
                        lists.map((item) => {
                            return (
                                <StyledSwiperSlide key={item.ActivityID}>
                                    <Link
                                        href={`/travel/detail/${item.ActivityID}`}
                                    >
                                        <Card
                                            cover={
                                                isObject(
                                                    item.Picture,
                                                    'PictureUrl1'
                                                ) ? (
                                                    <img
                                                        src={
                                                            item.Picture
                                                                .PictureUrl1
                                                        }
                                                        alt={item.ActivityName}
                                                    />
                                                ) : (
                                                    <NoImage />
                                                )
                                            }
                                            children={
                                                <Meta
                                                    // avatarUrl={item.Picture.PictureUrl1}
                                                    title={item.ActivityName}
                                                    description={
                                                        isObject(
                                                            item,
                                                            'StartTime'
                                                        )
                                                            ? dateTransfer(
                                                                  item.StartTime
                                                              ) +
                                                              '~' +
                                                              dateTransfer(
                                                                  item.EndTime
                                                              )
                                                            : '詳見官網'
                                                    }
                                                    address={
                                                        isObject(
                                                            item,
                                                            'Address'
                                                        )
                                                            ? item.Address
                                                            : '詳見官網'
                                                    }
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

export default ActivityCarouselCards;
