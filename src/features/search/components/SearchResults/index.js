import React from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment-timezone';

import Container from '@/components/Container';
import CardContainer from '@/components/CardContainer';
import Pagination from '@/lib/Pagination';
import CardSkeleton from '@/components/CardSkeleton';
import breakpoint from '@/lib/constant/breakpoint';
import { useTranslation } from 'next-i18next';

const SearchResultsTitle = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1.5rem 0;
`;
const SearchResultsTitleText = styled.div`
    color: ${(props) => props.theme.colors.primary};
    font-size: ${(props) => props.theme.fontSize.lg};
    font-weight: 600;
`;

const SearchInfo = styled.div`
    display: flex;
    .highlight {
        color: ${(props) => props.theme.colors.primary};
        margin: 0 0.5rem;
    }
`;

const SearchResultsContainer = styled.div`
    width: calc(100% + 1rem * 2);
    margin: 0 -1rem;
    display: flex;
    flex-wrap: wrap;
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px 0;
`;

const StyledCardSkeletonContainer = styled.div`
    width: calc(100% - 2rem);
    margin: 0 1rem;
    margin-bottom: 1rem;
    > a {
        > div {
            max-width: initial;
        }
    }
    ${breakpoint.mediaSM} {
        width: calc(100% / 3 - 2rem);
    }
    ${breakpoint.mediaMD} {
        width: calc(100% / 4 - 2rem);
    }
`;

const SearchResults = ({
    status,
    searchedInputValue,
    searchedInputCountyValue,
    results,
    PageDataArray,
    page,
    pageSize,
    totalPages,
    setPage,
    filteredType,
}) => {
    const { t } = useTranslation('common');
    return (
        <Container>
            <SearchResultsTitle>
                <SearchResultsTitleText>
                    {t('searchConfig.searchResults')}
                </SearchResultsTitleText>
                <SearchInfo>
                    <div>
                        {t('searchConfig.keyword')}
                        <span className="highlight">
                            {searchedInputValue
                                ? searchedInputValue
                                : t('searchConfig.noData')}
                        </span>
                    </div>
                    <div>
                        {t('searchConfig.area')}
                        <span className="highlight">
                            {searchedInputCountyValue
                                ? searchedInputCountyValue
                                : t('searchConfig.noData')}
                        </span>
                    </div>
                    {/* <div>
                        {t('searchConfig.total')}
                        <span className="highlight">
                            {results ? results.length : 0}
                        </span>
                        {t('searchConfig.records')}
                    </div> */}
                </SearchInfo>
            </SearchResultsTitle>
            <SearchResultsContainer>
                {(status === undefined ||
                    status === 'loading' ||
                    status === 'cancel') &&
                    Array(10)
                        .fill(0)
                        .map((item, i) => (
                            <StyledCardSkeletonContainer key={i}>
                                <CardSkeleton />
                            </StyledCardSkeletonContainer>
                        ))}
                {status === 'success' &&
                    PageDataArray &&
                    PageDataArray.map((item) => {
                        const {
                            Picture: { PictureUrl1 = null } = {},
                            StartTime,
                            EndTime,
                            Address,
                            ActivityID,
                            ActivityName,
                            ScenicSpotID,
                            ScenicSpotName,
                            RestaurantID,
                            RestaurantName,
                            Description,
                            DescriptionDetail,
                        } = item;
                        let formattedTime = `${moment(
                            StartTime,
                            moment.ISO_8601
                        )
                            .tz('Asia/Taipei')
                            .format('YYYY-MM-DD')} ~ ${moment(
                            EndTime,
                            moment.ISO_8601
                        )
                            .tz('Asia/Taipei')
                            .format('YYYY-MM-DD')}`;
                        let time = item?.OpenTime;
                        let openTime = time
                            ? t('carouselConfig.moreDetails')
                            : formattedTime;
                        let itemId, itemName;
                        if (ActivityID) {
                            itemId = ActivityID;
                            itemName = ActivityName;
                        } else if (ScenicSpotID) {
                            itemId = ScenicSpotID;
                            itemName = ScenicSpotName;
                        } else if (RestaurantID) {
                            itemId = RestaurantID;
                            itemName = RestaurantName;
                        }

                        return (
                            <CardContainer
                                key={itemId}
                                filteredType={filteredType}
                                itemId={itemId}
                                PictureUrl1={PictureUrl1}
                                itemName={t(`${itemId}.titleName`, {
                                    ns: `${filteredType}Data`,
                                })}
                                openTime={openTime}
                                description={openTime}
                                Address={
                                    Address
                                        ? t(`${itemId}.address`, {
                                              ns: `${filteredType}Data`,
                                          })
                                        : t(`carouselConfig.moreDetails`)
                                }
                            />
                        );
                    })}
                {status === 'success' &&
                    !PageDataArray &&
                    t(`searchConfig.noResults`)}
            </SearchResultsContainer>
            {status === 'success' && (
                <PaginationContainer>
                    <Pagination
                        page={page}
                        pageSize={pageSize}
                        total={totalPages}
                        onChange={setPage}
                        withEllipsis
                    />
                </PaginationContainer>
            )}
        </Container>
    );
};

export default SearchResults;
