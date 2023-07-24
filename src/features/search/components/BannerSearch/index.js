import React, { useState } from 'react';
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
    padding-bottom: 75.52%;
    background-image: url(/images/banner-${(props) => props.$type}-mb.jpg);
    background-position: center;
    background-size: cover;
    ${breakpoint.mediaMD} {
        padding-bottom: 30%;
        background-image: url(/images/banner-${(props) => props.$type}-pc.jpg);
    }
    &::after {
        content: '';
        background-color: ${(props) => props.theme.colors.black};
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

const BannerContentBox = styled('div')`
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 50rem;
    width: 100%;
    height: 70%;
    // background-color: rgba(255,255,255,0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    ${breakpoint.mediaMD} {
        width: 60%;
    }
`;

const BannerContent = styled.div`
    max-width: 30rem;
    width:100%;
    ${breakpoint.mediaMD} {
        max-width: auto;
        width: 88%;
    }
`;

const BannerTitle = styled.div`
    width: ${(props) => props.$locale === 'en' ? '62%' : '100%'};
    margin: ${(props) => props.$locale === 'en' ? '0 auto' : 'auto'};
    font-size: ${(props) => props.theme.fontSize.xl};
    font-weight: 600;
    color: ${(props) => props.theme.colors.white};
    text-shadow: 1px 1px 0 #444, 2px 2px 0 #444, 3px 3px 0 #444;
    margin-bottom: 0.4rem;
`;

const BannerSearchBox = styled.div`
    font-size: ${(props) => props.theme.fontSize.sm};
    > div:first-of-type{
        display: flex;
        justify-content: center;
        align-items: flex-start;
        >div:first-of-type{
            width:40%;
            height:2.5rem;
            margin-right:1rem;
            margin-bottom:0;
        }
        >div:last-of-type{
            height:2.5rem;
        }
    }
`;

const SearchButton = styled(Button)`
    height: 2rem;
    &:hover {
        background-color: rgb(38, 97, 112);
    }
    &:active {
        box-shadow: rgba(30, 159, 210, 0.48) 0px 0px 0px 2px;
    }
`;

const ClassThemeContainer = styled.div`
    font-size: ${(props) => props.theme.fontSize.sm};
    margin:1rem 0;
`

const ClassThemeTitle = styled.span`
    color: ${(props) => props.theme.colors.white};
    text-shadow: 1px 1px 0 #444, 2px 2px 0 #444, 3px 3px 0 #444;
    font-weight:600;
    margin-right:0.5rem;
`

const ClassThemeTab = styled.span`
    color: ${(props) => props.theme.colors.white};
    font-weight:600;
    text-shadow:${(props) => props.$isSelected ? `0 1px 2px #e18d0e` : 'none'};
    padding: 0.1rem 0.5rem;
    border-radius: 1rem;
    border:1px solid #ffaf1e;
    margin-right:0.2rem;
    background:${(props) => props.$isSelected ? `linear-gradient(45deg, #ffaf1e, #ffd56e)` : `rgba(0,0,0,0.6)`};
`

const BannerSearch = ({
    type,
    area,
    selectedCountyText,
    setSelectedCountyText,
    setSelectedCountyValue,
    inputValue,
    setInputValue,
    selectedCountyValue,
    locale,
    fetchFilteredData,
    handleSearch,
    setClassValue,
    classValue,
    ...props
}) => {
    const { t } = useTranslation('common');
    const handleClassThemeTabClick = (value) => {
        if (classValue === value) {
            setClassValue('');
        } else {
            setClassValue(value);
        }
    };

    return (
        <BannerContainer $type={type}>
            <BannerContentBox>
                <BannerContent>
                    <BannerTitle $locale={locale}>{t(`searchConfig.${type}BannerTitle_01`)}<br style={{ display: locale === 'en' ? 'block' : "none" }} />{t(`searchConfig.${type}BannerTitle_02`)}</BannerTitle>
                    <BannerSearchBox>
                        <div>
                            <TextField
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={t(`searchConfig.searchKeyword`)}
                                value={inputValue}
                            />
                            <Select
                                selectedCountyValue={selectedCountyValue}
                                selectedCountyText={selectedCountyText}
                                setSelectedCountyText={setSelectedCountyText}
                                setSelectedCountyValue={setSelectedCountyValue}
                                locale={locale}
                            />
                        </div>
                        <ClassThemeContainer>
                            <ClassThemeTitle>
                                {t('searchConfig.classTheme')}
                            </ClassThemeTitle>
                            {t(`searchConfig.${type}Theme`, {
                                returnObjects: true,
                            }).map((item, i) =>
                                <ClassThemeTab
                                    key={i}
                                    onClick={() => {
                                        handleClassThemeTabClick(item.value)
                                    }}
                                    $isSelected={classValue === item.value}
                                >
                                    {item.name}
                                </ClassThemeTab>)}
                        </ClassThemeContainer>
                        <SearchButton
                            onClick={handleSearch}
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
