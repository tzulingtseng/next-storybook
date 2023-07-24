import React from 'react';
import styled from 'styled-components';

import Wrapper from '@/components/Wrapper';
import CardContainer from '@/components/CardContainer';
import CardSkeleton from '@/components/CardSkeleton';
import breakpoint from '@/lib/constant/breakpoint';
import { useTranslation } from 'next-i18next';
import transferTime from '@/utils/transferTime';
import convertGoogleDriveURL from '@/utils/convertGoogleDriveURL';

const SearchResultsTitle = styled.div`
    width: 100%;
    display: block;
    
    justify-content: space-between;
    align-items: baseline;
    padding: 1.5rem 0;
    ${breakpoint.mediaSM}{
        display: flex;  
    }
`;
const SearchResultsTitleText = styled.div`
    color: ${(props) => props.theme.colors.primary};
    font-size: ${(props) => props.theme.fontSize.lg};
    font-weight: 600;
      margin-bottom:1rem;
        ${breakpoint.mediaSM}{
        margin-bottom:0;
    }
`;

const SearchInfo = styled.div`
    display: flex;
    .highlight {
        color: ${(props) => props.theme.colors.primary};
        margin: 0 0.5rem;
    }
`;

const SearchResultsContainer = styled.div`
    width: calc(100% + 0.5rem * 2);
    margin: 0 -0.5rem;
    display: flex;
    flex-wrap: wrap;
`;

// const PaginationContainer = styled.div`
//     display: flex;
//     justify-content: center;
//     margin: 10px 0;
// `;

const StyledEndMsg = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    color: ${(props) => props.theme.colors.grey2};
    font-size: ${(props) => props.theme.fontSize.sm};
    margin: 1.5rem 0;
`;

const StyledNoResults = styled.div`
    width: calc(100% - 2rem);
    margin: 0 1rem;
    padding: 4rem 0;
    background-color: #f5fdff;
    color: #60797c;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    font-size: ${(props) => props.theme.fontSize.sm};
`;

const StyledCardSkeletonContainer = styled.div`
    display: inline-flex;
    width: calc(100% - 0.5rem * 2);
    margin: 0 0.5rem;
    margin-bottom: 1rem;
    > a {
        > div {
            max-width: initial;
        }
    }
    ${breakpoint.mediaSM} {
        width: calc(100% / 2 - 0.5rem * 2);
    }
    ${breakpoint.mediaMD} {
        width: calc(100% / 3 - 0.5rem * 2);
    }
    ${breakpoint.mediaLG} {
        width: calc(100% / 4 - 0.5rem * 2);
    }
`;

const SearchResults = ({
    type,
    status,
    results,
    isLoading,
    isEnd,
    keyword,
    searchedCountyText,
    classVal,
    fetchDataNumber
}) => {
    const { t } = useTranslation('common');
    return (
        <Wrapper>
            <SearchResultsTitle>
                <SearchResultsTitleText>
                    {t('searchConfig.searchResults')}
                </SearchResultsTitleText>
                <SearchInfo>
                    <div>
                        {t('searchConfig.keyword')}
                        <span className="highlight">
                            {keyword ? keyword : t('searchConfig.noData')}
                        </span>
                    </div>|&nbsp;
                    <div>
                        {t('searchConfig.area')}
                        <span className="highlight">
                            {searchedCountyText !== ''
                                ? searchedCountyText
                                : t('countyOptions.all')}
                        </span>
                    </div>|&nbsp;
                    <div>
                        {t('searchConfig.classTheme')}
                        <span className="highlight">
                            {classVal
                                ? classVal
                                : t('searchConfig.noData')}
                        </span>
                    </div>
                </SearchInfo>
            </SearchResultsTitle>
            <SearchResultsContainer>
                {
                    results &&
                    results.map((item, i) => {
                        const {
                            Picture: { PictureUrl1 = null } = {},
                            OpenTime,
                            StartTime,
                            EndTime,
                            Address,
                            ActivityID,
                            ActivityName,
                            ScenicSpotID,
                            ScenicSpotName,
                            RestaurantID,
                            RestaurantName,
                            Class, Class1, Class2, Class3,
                        } = item;

                        let transferedTime = transferTime(
                            OpenTime,
                            StartTime,
                            EndTime
                        );

                        let convertImgUrl = convertGoogleDriveURL(PictureUrl1);

                        let classData, itemId, itemName;
                        switch (type) {
                            case 'scenicSpot':
                                classData = ["文化類", "生態類", "遊憩類"]
                                itemId = ScenicSpotID;
                                itemName = ScenicSpotName;
                                break;
                            case 'activity':
                                classData = ["遊憩活動", "年度活動", "藝文活動"]
                                itemId = ActivityID;
                                itemName = ActivityName;
                                break;
                            case 'restaurant':
                                classData = ["地方特產", "異國料理", "中式美食"]
                                itemId = RestaurantID;
                                itemName = RestaurantName;
                                break;
                        }

                        let classArr = []

                        if (Class || Class1 || Class2 || Class3) {
                            classArr.push(Class, Class1, Class2, Class3);
                        }
                        const filterClass = classData.filter(item => classArr.includes(item))[0];

                        return (
                            <CardContainer
                                key={i}
                                type={type}
                                itemId={itemId}
                                itemName={itemName}
                                PictureUrl1={convertImgUrl}
                                description={
                                    transferedTime === 'allDay'
                                        ? t('carouselConfig.allDay')
                                        : transferedTime === 'moreDetails'
                                            ? t('carouselConfig.moreDetails')
                                            : transferedTime
                                }
                                address={Address ? Address : t('carouselConfig.moreDetails')}
                                text={t(`carouselConfig.openTime`)}
                                iconClass="fa-solid fa-location-dot"
                                bageText={classVal || filterClass}
                            />
                        );
                    })}
                {isLoading && !isEnd &&
                    Array(fetchDataNumber).fill(0)
                        .map((item, i) => (
                            <StyledCardSkeletonContainer key={i}>
                                <CardSkeleton />
                            </StyledCardSkeletonContainer>
                        ))}
                {/* status ==='error' */}
                {status === 'success' && results.length === 0 && isEnd && (
                    <StyledNoResults>
                        <div>{t(`searchConfig.noResults`)}</div>
                    </StyledNoResults>
                )}
                {status === 'success' && isEnd && (
                    <StyledEndMsg>
                        <div>{t(`searchConfig.scrollToEnd`)}</div>
                    </StyledEndMsg>
                )}
            </SearchResultsContainer>
        </Wrapper>
    );
};

export default SearchResults;
