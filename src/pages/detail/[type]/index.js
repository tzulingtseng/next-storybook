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
import NearbySpot from '@/features/detail/components/NearbySpot';
import GoToTop from '@/components/GoToTop';

const InfoContainer = styled.div`
    margin-top: 3rem;
`;

const InfoTitleBox = styled.div`
    display: block;
    align-items: baseline;
    ${breakpoint.mediaMD}{
        display: flex;  
    }
`

const InfoTitle = styled.div`
    margin: 1.5rem 0;
    font-size: ${(props) => props.theme.fontSize.xl};
    font-weight: 600;
`;

const InfoBage = styled.div`
    margin-bottom:1.5rem;
    ${breakpoint.mediaMD}{
        margin-bottom:0rem;
    }
`

const Badge = styled.span`
    // position: absolute;
    // left: 0.5rem;
    // bottom: 0.5rem;
    margin-left:0.5rem;
    font-size: 1rem;
    font-weight: 700;
    color: ${(props) => props.theme.colors.white};
    text-shadow: 0 1px 2px #e18d0e;
    padding: 0.1rem 0.5rem;
    border-radius: 1rem;
    background: linear-gradient(45deg, #ffaf1e, #ffd56e);
    &:first-of-type{
        margin-left:0rem;
    }
    ${breakpoint.mediaMD}{
        &:first-of-type{
            margin-left:0.5rem;
        }
    }
`;

const InfoBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    ${breakpoint.mediaMD} {
        flex-direction: initial;
    }
`;

const InfoImageContainer = styled.div`
    width: 100%;
    position: relative;
    padding-bottom:68%;
    overflow: hidden;
    border-radius: 1rem;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
    img {
        position:absolute;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        &:hover {
            transform: scale(1.2);
            transition: transform 0.5s;
        }
    }
    ${breakpoint.mediaMD} {
        width: 50%;
        padding-bottom:34%;
    }
`;

const InfoDetailContainer = styled.div`
    width: 100%;
    padding-left: 0rem;
    padding-top: 1.5rem;
    ${breakpoint.mediaMD} {
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

const NearByContainer = styled('div')``;

const Detail = ({ data }) => {
    const router = useRouter();
    const { locale } = useRouter();
    const [selectedValue, setSelectedValue] = useState(locale);

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
        ClassArr,
        filterClass
    } = data.detailData;

    let convertImgUrl = convertGoogleDriveURL(Picture.PictureUrl1);

    // http://localhost:3000/en/detail/activity?id=C2_315080000H_502349
    useEffect(() => {
        router.push(`/detail/${QueryType}?id=${SpotID}`, undefined, {
            locale: selectedValue,
        });
    }, [selectedValue]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <SEO title={SpotName} />
                <Container>
                    <GoToTop />
                    <NavBar
                        locale={locale}
                        selectedValue={selectedValue}
                        setSelectedValue={setSelectedValue}
                    />
                    <Wrapper>
                        <InfoContainer>
                            <InfoTitleBox>
                                <InfoTitle>{SpotName}</InfoTitle>
                                <InfoBage>
                                    {ClassArr && ClassArr.map((item, i) =>
                                        item && <Badge key={i}>
                                            {item}
                                        </Badge>)}
                                </InfoBage>
                            </InfoTitleBox>
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
                            <NearByContainer>
                                <NearbySpot
                                    queryType={QueryType}
                                    position={Position}
                                    spotId={SpotID}
                                    title={t(`detailConfig.${QueryType}NearByTitle`)}
                                    bageText={filterClass}
                                />
                            </NearByContainer>
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
    let classData, Class, Class1, Class2, Class3, classArr, filterClass

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

                classData = ["遊憩活動", "年度活動", "藝文活動"]
                classArr = []
                Class = data?.Class ?? null
                Class1 = data?.Class1 ?? null
                Class2 = data?.Class2 ?? null
                Class3 = data?.Class3 ?? null

                if (Class || Class1 || Class2 || Class3) {
                    classArr.push(Class, Class1, Class2, Class3);
                }
                filterClass = classData && classData.filter(item => classArr.includes(item))[0];

                detailData = {
                    QueryType: type,
                    Address: data?.Address ?? null,
                    // City: data?.City ?? null,
                    // Location: data?.Location ?? null,
                    Description: data?.Description ?? data.DescriptionDetail,
                    formattedTime: transferedTime,
                    Phone: data?.Phone ?? null,
                    Picture: data?.Picture ?? null,
                    Position: data?.Position ?? null,
                    SpotID: data?.ActivityID ?? null,
                    SpotName: data?.ActivityName ?? null,
                    SrcUpdateTime: data?.SrcUpdateTime ?? null,
                    UpdateTime: data?.UpdateTime ?? null,
                    ClassArr: classArr ?? null,
                    filterClass: filterClass ?? null,
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

                classData = ["文化類", "生態類", "遊憩類"]
                classArr = []
                Class = data?.Class ?? null
                Class1 = data?.Class1 ?? null
                Class2 = data?.Class2 ?? null
                Class3 = data?.Class3 ?? null

                if (Class || Class1 || Class2 || Class3) {
                    classArr.push(Class, Class1, Class2, Class3);
                }
                filterClass = classData && classData.filter(item => classArr.includes(item))[0];

                detailData = {
                    QueryType: type,
                    Address: data?.Address ?? null,
                    // City: data?.City ?? null,
                    // Location: data?.Location ?? null,
                    Description: data?.Description ?? data.DescriptionDetail,
                    formattedTime: transferedTime,
                    Phone: data?.Phone ?? null,
                    Picture: data?.Picture ?? null,
                    Position: data?.Position ?? null,
                    SpotID: data?.ScenicSpotID ?? null,
                    SpotName: data?.ScenicSpotName ?? null,
                    SrcUpdateTime: data?.SrcUpdateTime ?? null,
                    UpdateTime: data?.UpdateTime ?? null,
                    ClassArr: classArr ?? null,
                    filterClass: filterClass ?? null,
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

                classData = ["地方特產", "異國料理", "中式美食"]
                classArr = []
                Class = data?.Class ?? null
                Class1 = data?.Class1 ?? null
                Class2 = data?.Class2 ?? null
                Class3 = data?.Class3 ?? null

                if (Class || Class1 || Class2 || Class3) {
                    classArr.push(Class, Class1, Class2, Class3);
                }
                filterClass = classData && classData.filter(item => classArr.includes(item))[0];

                detailData = {
                    QueryType: type,
                    Address: data?.Address ?? null,
                    // City: data?.City ?? null,
                    Location: data?.Location ?? null,
                    Description: data?.Description ?? data.DescriptionDetail,
                    formattedTime: transferedTime,
                    Phone: data?.Phone ?? null,
                    Picture: data?.Picture ?? null,
                    Position: data?.Position ?? null,
                    SpotID: data?.RestaurantID ?? null,
                    SpotName: data?.RestaurantName ?? null,
                    SrcUpdateTime: data?.SrcUpdateTime ?? null,
                    UpdateTime: data?.UpdateTime ?? null,
                    ClassArr: classArr ?? null,
                    filterClass: filterClass ?? null,
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
