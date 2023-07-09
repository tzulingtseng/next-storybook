import React from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import BannerActivity from '@/assets/images/banner-activity.png';
import BannerScenicSpot from '@/assets/images/banner-scenicSpot.png';
import BannerRestaurant from '@/assets/images/banner-restaurant.png';
import Skeleton from 'react-loading-skeleton';

import TextField from '@/lib/TextField';
import Button from '@/lib/Button';
import Select from '@/features/search/components/Select';
import breakpoint from '@/lib/constant/breakpoint';

const BannerContainer = styled.div`
    width: 100%;
    position: relative;
    padding-bottom: 40.56%;
    > img {
        width: 100%;
        height: auto;
    }
`;

const BannerMask = styled.div`
    background-color: ${(props) => props.theme.colors.white};
    opacity: 0.1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const BannerImgBox = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
`;

const BannerContentBox = styled('div')`
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    ${breakpoint.mediaSM} {
        width: 70%;
    }
    ${breakpoint.mediaMD} {
        max-width: 35rem;
        width: 100%;
    }
`;

const BannerContent = styled.div`
    text-align: center;
`;

const BannerTitle = styled.div`
    font-size: ${(props) => props.theme.fontSize.xl};
    font-weight: 600;
    color: ${(props) => props.theme.colors.white};
    margin-bottom: 2rem;
    ${breakpoint.mediaMD} {
        font-size: ${(props) => props.theme.fontSize.xxl};
    }
`;

const BannerSearchBox = styled.div`
    height: 2.5rem;
    line-height: 1;
    font-size: ${(props) => props.theme.fontSize.sm};
    display: flex;
    justify-content: space-between;
`;

const BannerSearch = ({
    bannerTitle,
    bannerImgSrc,
    inputValue,
    setInputValue,
    selectedCounty,
    setSelectedCounty,
    handleFilteredResults,
    searchedInputValue,
    setSearchedInputValue,
    setSearchedInputCountyValue,
}) => {
    const { t } = useTranslation('common');
    const getBannerImage = () => {
        switch (bannerImgSrc) {
            case 'BannerActivity':
                return (
                    <Image src={BannerActivity} alt="Banner" priority={true} />
                );
            case 'BannerScenicSpot':
                return (
                    <Image
                        src={BannerScenicSpot}
                        alt="Banner"
                        priority={true}
                    />
                );
            case 'BannerRestaurant':
                return (
                    <Image
                        src={BannerRestaurant}
                        alt="Banner"
                        priority={true}
                    />
                );
            default:
                return <Skeleton height="100%" />;
        }
    };
    return (
        <BannerContainer>
            <BannerImgBox>{getBannerImage()}</BannerImgBox>
            <BannerMask />
            <BannerContentBox>
                <BannerContent>
                    <BannerTitle>{bannerTitle}</BannerTitle>
                    <BannerSearchBox>
                        <TextField
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={t(`searchConfig.searchKeyword`)}
                            value={inputValue}
                        />
                        {/* <TextField
                            onChange={(e) =>
                                setInputCountyValue(e.target.value)
                            }
                            placeholder={t(`searchConfig.searchKeyword`)}
                            value={inputCountyValue}
                        /> */}
                        <Select
                            selectedCounty={selectedCounty}
                            setSelectedCounty={setSelectedCounty}
                        />
                        <Button
                            style={{ height: '2.5rem' }}
                            onClick={() => {
                                setSearchedInputValue(inputValue);
                                setSearchedInputCountyValue(selectedCounty);
                            }}
                        >
                            {t(`searchConfig.searchButton`)}
                        </Button>
                    </BannerSearchBox>
                </BannerContent>
            </BannerContentBox>
        </BannerContainer>
    );
};

export default BannerSearch;
