import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
// import Skeleton from 'react-loading-skeleton';
import breakpoint from '@/lib/constant/breakpoint';

import TextField from '@/lib/TextField';
import Button from '@/lib/Button';
import Select from '@/features/search/components/Select';

const BannerContainer = styled.div`
    width: 100%;
    position: relative;
    padding-bottom: 62.5%;
    background-image: url(/images/banner-${(props) => props.$type}-mb.jpg);
    background-position: center;
    background-size: cover;
    ${breakpoint.mediaMD} {
        padding-bottom: 40.3%;
        background-image: url(/images/banner-${(props) => props.$type}-pc.jpg);
    }
    &::after {
        content: '';
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
    }
`;

// const BannerImgBox = styled.div`
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     top: 0;
//     left: 0;
//     > img {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//         object-position: center;
//     }
// `;

const BannerContentBox = styled('div')`
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    ${breakpoint.mediaSM} {
        width: 74%;
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
    flex-wrap:wrap;
    justify-content: space-between;
    ${breakpoint.mediaSM} {
        justify-content: space-evenly;
        flex-wrap:nowrap;
    }
`;

const SearchButton = styled(Button)`
    height: 2.5rem;
    &:hover {
        background-color: rgb(38, 97, 112);
    }
    &:active {
        box-shadow: rgba(30, 159, 210, 0.48) 0px 0px 0px 2px;
    }
`;

const BannerSearch = ({
    type,
    bannerTitle,
    selectedCountyText,
    setSelectedCountyText,
    setSelectedCountyValue,
    setSearchedInputValue,
    setSearchedCountyText,
    setSearchedCountyValue,
    inputValue,
    setInputValue,
    selectedCountyValue,
}) => {
    const { t } = useTranslation('common');
    return (
        <BannerContainer $type={type}>
            <BannerContentBox>
                <BannerContent>
                    <BannerTitle>{bannerTitle}</BannerTitle>
                    <BannerSearchBox>
                        <TextField
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={t(`searchConfig.searchKeyword`)}
                            value={inputValue}
                        />
                        <Select
                            selectedCountyText={selectedCountyText}
                            setSelectedCountyText={setSelectedCountyText}
                            setSelectedCountyValue={setSelectedCountyValue}
                        />
                        <SearchButton
                            onClick={() => {
                                setSearchedInputValue(inputValue);
                                setSearchedCountyText(selectedCountyText);
                                setSearchedCountyValue(selectedCountyValue);
                            }}
                        >
                            {t(`searchConfig.searchButton`)}
                        </SearchButton>
                    </BannerSearchBox>
                </BannerContent>
            </BannerContentBox>
        </BannerContainer>
    );
};

export default BannerSearch;
