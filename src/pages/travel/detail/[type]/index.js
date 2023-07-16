import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment-timezone';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import transferTime from '@/utils/transferTime';
import SEO from '@/utils/seo';

import getActivityAPI from '@/api/getActivityAPI';
import getScenicSpotAPI from '@/api/getScenicSpotAPI';
import getRestaurantAPI from '@/api/getRestaurantAPI';

import ThemeProvider from '@/lib/ThemeProvider';
import theme from '@/lib/theme';
import NavBar from '@/lib/NavBar';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import Wrapper from '@/components/Wrapper';
import TransportInfo from '@/features/detail/components/TransportInfo';
import convertGoogleDriveURL from '@/utils/convertGoogleDriveURL';
import breakpoint from '@/lib/constant/breakpoint';
import NoImage from '@/components/NoImage';

const InfoContainer = styled.div`
    margin-top: 3rem;
`;

const InfoTitle = styled.div`
    margin: 1.5rem 0;
    font-size: ${(props) => props.theme.fontSize.xl};
    font-weight: 600;
`;

const InfoBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    ${breakpoint.mediaSM} {
        flex-direction: initial;
    }
`;

const InfoImageContainer = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    border-radius: 1rem;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
    img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        &:hover {
            transform: scale(1.2);
            transition: transform 0.5s;
        }
    }
    ${breakpoint.mediaSM} {
        width: 50%;
    }
`;

const InfoDetailContainer = styled.div`
    width: 100%;
    padding-left: 0rem;
    padding-top: 1.5rem;
    ${breakpoint.mediaSM} {
        width: 50%;
        padding-left: 1.5rem;
        padding-top: 0rem;
    }
`;

const InfoDetailTitle = styled.div`
    font-size: ${(props) => props.theme.fontSize.lg};
    font-weight: 600;
    margin-bottom: 1.5rem;
`;

const InfoDetailItem = styled.div`
    font-size: ${(props) => props.theme.fontSize.sm};
    font-weight: 600;
    margin: 1rem 0;
`;

const IntroContainer = styled.div`
    margin-bottom: 3rem;
    > .leaflet-container {
        width: 100%;
        height: 30rem;
        border-radius: 1rem;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
    }
`;

const IntroTitle = styled.div`
    font-size: ${(props) => props.theme.fontSize.lg};
    font-weight: 600;
    margin: 1.5rem 0;
`;

const MapContainer = styled('div')``;

const Detail = ({ data }) => {
    const router = useRouter();
    const { locale, push } = useRouter();
    const [selectedValue, setSelectedValue] = useState(locale);
    const [selectLang, setSelectLang] = useState(false);
    const { t } = useTranslation('common');
    const {
        QueryType,
        Address,
        // City,
        // Location,
        Description,
        // DescriptionDetail,
        formattedTime,
        // ParkingPosition,
        Phone,
        Picture,
        Position,
        // Remarks,
        SpotID,
        SpotName,
        SrcUpdateTime,
        // TicketInfo,
        // TravelInfo,
        UpdateTime,
        // ZipCode,
    } = data.detailData;

    let convertImgUrl = convertGoogleDriveURL(Picture.PictureUrl1);

    // http://localhost:3000/en/travel/detail/activity?id=C2_315080000H_502349
    useEffect(() => {
        router.push(`/travel/detail/${QueryType}?id=${SpotID}`, undefined, {
            locale: selectedValue,
        });
    }, [selectedValue]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <SEO title={SpotName} />
                <Container>
                    <NavBar
                        locale={locale}
                        selectedValue={selectedValue}
                        setSelectedValue={setSelectedValue}
                        selectLang={selectLang}
                    />
                    <Wrapper>
                        <InfoContainer>
                            <InfoTitle>{SpotName}</InfoTitle>
                            <InfoBox>
                                <InfoImageContainer>
                                    {convertImgUrl ? (
                                        <img
                                            src={convertImgUrl}
                                            alt={SpotName}
                                        />
                                    ) : (
                                        <NoImage />
                                    )}
                                </InfoImageContainer>
                                <InfoDetailContainer>
                                    <InfoDetailTitle>
                                        {t('detailConfig.information')}
                                    </InfoDetailTitle>
                                    <InfoDetailItem>
                                        {t('detailConfig.tel')}
                                    </InfoDetailItem>
                                    <div>
                                        {Phone
                                            ? Phone
                                            : t('detailConfig.moreDetails')}
                                    </div>
                                    <InfoDetailItem>
                                        {t('detailConfig.address')}
                                    </InfoDetailItem>
                                    <div>{Address ? Address : '詳見官網'}</div>
                                    <InfoDetailItem>
                                        {t('detailConfig.openTime')}
                                    </InfoDetailItem>
                                    <div>
                                        {formattedTime === 'allDay'
                                            ? t('carouselConfig.allDay')
                                            : formattedTime === 'moreDetails'
                                            ? t('carouselConfig.moreDetails')
                                            : formattedTime}
                                    </div>
                                </InfoDetailContainer>
                            </InfoBox>
                        </InfoContainer>
                        <IntroContainer>
                            <IntroTitle>
                                {t('detailConfig.introTitle')}
                            </IntroTitle>
                            <div>{Description}</div>
                            <IntroTitle>
                                {t('detailConfig.mapTitle')}
                            </IntroTitle>
                            <TransportInfo position={Position} />
                        </IntroContainer>
                        {/* <MapContainer></MapContainer> */}
                    </Wrapper>
                    <Footer />
                </Container>
            </ThemeProvider>
        </>
    );
};

export async function getServerSideProps({ params, query, locale }) {
    // TODO:為什麼要用 params
    const { id, type } = query;
    // console.log('type', type);
    let detailData;
    let responseData;

    switch (type) {
        // activitiy: call API 取得特定觀光活動資料
        case 'activity':
            responseData = await getActivityAPI({
                filter: `ActivityID eq '${id}'`,
            });
            if (responseData?.status === 'success') {
                // handle success (取得觀光活動資料)
                let data = responseData?.data[0];

                let transferedTime = transferTime(
                    data?.OpenTime,
                    data?.StartTime,
                    data?.EndTime
                );

                detailData = {
                    QueryType: type,
                    Address: data?.Address ?? null,
                    // City: data?.City ?? null,
                    // Location: data?.Location ?? null,
                    Description: data?.Description ?? DescriptionDetail,
                    formattedTime: transferedTime,
                    Phone: data?.Phone ?? null,
                    Picture: data?.Picture ?? null,
                    Position: data?.Position ?? null,
                    SpotID: data?.ActivityID ?? null,
                    SpotName: data?.ActivityName ?? null,
                    SrcUpdateTime: data?.SrcUpdateTime ?? null,
                    UpdateTime: data?.UpdateTime ?? null,
                };
            } else {
                // handle error (後端錯誤) -> not found page(404 page)
                // TODO:為啥用 notFound 處理錯誤
                return {
                    notFound: true,
                };
            }
            break;
        // scenicSpot: call API 取得特定觀光景點資料
        case 'scenicSpot':
            responseData = await getScenicSpotAPI({
                filter: `ScenicSpotID eq '${id}'`,
            });
            if (responseData?.status === 'success') {
                // handle success (取得觀光活動資料)
                let data = responseData?.data[0];

                let transferedTime = transferTime(
                    data?.OpenTime,
                    data?.StartTime,
                    data?.EndTime
                );

                detailData = {
                    QueryType: type,
                    Address: data?.Address ?? null,
                    // City: data?.City ?? null,
                    // Location: data?.Location ?? null,
                    Description: data?.Description ?? null,
                    formattedTime: transferedTime,
                    Phone: data?.Phone ?? null,
                    Picture: data?.Picture ?? null,
                    Position: data?.Position ?? null,
                    SpotID: data?.ScenicSpotID ?? null,
                    SpotName: data?.ScenicSpotName ?? null,
                    SrcUpdateTime: data?.SrcUpdateTime ?? null,
                    UpdateTime: data?.UpdateTime ?? null,
                };
            } else {
                // handle error (後端錯誤) -> not found page(404 page)
                // TODO:為啥用 notFound 處理錯誤
                return {
                    notFound: true,
                };
            }
            break;
        // restaurant: call API 取得特定觀光餐廳資料
        case 'restaurant':
            responseData = await getRestaurantAPI({
                filter: `RestaurantID eq '${id}'`,
            });
            if (responseData?.status === 'success') {
                // handle success (取得觀光活動資料)
                let data = responseData?.data[0];

                let transferedTime = transferTime(
                    data?.OpenTime,
                    data?.StartTime,
                    data?.EndTime
                );

                detailData = {
                    QueryType: type,
                    Address: data?.Address ?? null,
                    // City: data?.City ?? null,
                    // Location: data?.Location ?? null,
                    Description: data?.Description ?? null,
                    formattedTime: transferedTime,
                    Phone: data?.Phone ?? null,
                    Picture: data?.Picture ?? null,
                    Position: data?.Position ?? null,
                    SpotID: data?.RestaurantID ?? null,
                    SpotName: data?.RestaurantName ?? null,
                    SrcUpdateTime: data?.SrcUpdateTime ?? null,
                    UpdateTime: data?.UpdateTime ?? null,
                };
            } else {
                // handle error (後端錯誤) -> not found page(404 page)
                // TODO:為啥用 notFound 處理錯誤
                return {
                    notFound: true,
                };
            }
            break;
    }
    const returnData = {
        props: {
            ...(await serverSideTranslations(locale, [
                'api_mapping',
                'common',
                'activityData',
                'scenicSpotData',
                'restaurantData',
            ])),
            data: {
                detailData,
            },
        },
    };
    return returnData;
}

export default Detail;
