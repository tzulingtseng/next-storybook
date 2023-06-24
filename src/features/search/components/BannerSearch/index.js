import React from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import BannerActivity from '@/assets/images/banner-activity.png';
import BannerscenicSpot from '@/assets/images/banner-scenicSpot.png';
import BannerRestaurant from '@/assets/images/banner-restaurant.png';

import TextField from '@/lib/TextField';
import Button from '@/lib/Button';

const BannerContainer = styled.div`
    width: 100%;
    position: relative;
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
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BannerContentBox = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50rem;
`;

const BannerContent = styled.div`
    text-align: center;
`;

const BannerTitle = styled.div`
    font-size: ${(props) => props.theme.fontSize.xxl};
    font-weight: 600;
    color: ${(props) => props.theme.colors.white};
`;

const BannerSearchBox = styled.div``;

const BannerSearch = ({
    bannerTitle,
    bannerImgSrc,
    inputValue,
    setInputValue,
    inputCountyValue,
    setInputCountyValue,
    handleFilteredResults,
}) => {
    return (
        <BannerContainer>
            {/* TODO:待優化寫法 */}
            {bannerImgSrc !== null && bannerImgSrc === 'BannerActivity' ? (
                <Image src={BannerActivity} alt="Banner" />
            ) : bannerImgSrc === 'BannerscenicSpot' ? (
                <Image src={BannerscenicSpot} alt="Banner" />
            ) : (
                <Image src={BannerRestaurant} alt="Banner" />
            )}
            <BannerMask />
            <BannerContentBox>
                <BannerContent>
                    <BannerTitle>尋找{bannerTitle}</BannerTitle>
                    <BannerSearchBox>
                        <TextField
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="搜尋"
                            value={inputValue}
                        />
                        <TextField
                            onChange={(e) =>
                                setInputCountyValue(e.target.value)
                            }
                            placeholder="搜尋"
                            value={inputCountyValue}
                        />
                        {/* <Select
                        onSelect={function noRefCheck() {}}
                        options={[
                            {
                                label: '我全都要',
                                value: 'all',
                            },
                            {
                                label: 'AZ 疫苗',
                                value: 'AZ',
                            },
                            {
                                label: 'BNT 疫苗',
                                value: 'BNT',
                            },
                            {
                                label: '莫德納疫苗',
                                value: 'Moderna',
                            },
                            {
                                label: '高端疫苗',
                                value: 'Vaccine',
                            },
                        ]}
                        placeholder="請選擇預約疫苗"
                    /> */}
                        <Button onClick={handleFilteredResults}>搜尋</Button>
                    </BannerSearchBox>
                </BannerContent>
            </BannerContentBox>
        </BannerContainer>
    );
};

export default BannerSearch;
