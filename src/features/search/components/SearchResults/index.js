import React from 'react';
import styled, { css } from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';

import Button from '@/lib/Button';
import Container from '@/components/Container';
import CardContainer from '@/components/CardContainer';
import Pagination from '@/lib/Pagination';
import CardSkeleton from '@/components/CardSkeleton';
import breakpoint from '@/lib/constant/breakpoint';
import { useTranslation } from 'next-i18next';
import transferTime from '@/utils/transferTime';
import convertGoogleDriveURL from '@/utils/convertGoogleDriveURL';

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
    // width: calc(100% + 1rem * 2);
    // margin: 0 -1rem;
    // display: flex;
    // flex-wrap: wrap;
    .infinite-scroll-component__outerdiv {
        width: 100%;
        .infinite-scroll-component {
            display: flex;
            width: calc(100% + 1rem * 2);
            margin: 0 -1rem;
            flex-wrap: wrap;
        }
    }
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px 0;
`;

const StyledCardSkeletonContainer = styled.div`
    display: inline-flex;
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

const StyledEndMsg = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    color: ${(props) => props.theme.colors.grey2};
    margin: 1.5rem 0;
`;

const SearchResults = ({
    status,
    searchedInputValue,
    searchedInputCountyValue,
    results,
    // PageDataArray,
    page,
    pageSize,
    totalPages,
    setPage,
    type,
    hasMore,
    setHasMore,
    fetchMoreData,
    fetchMoreNum,
    fetchMoreKeywordNum,
}) => {
    console.log('results', results);
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
                            {searchedInputValue ? searchedInputValue : '無'}
                        </span>
                    </div>
                    <div>
                        {t('searchConfig.area')}
                        <span className="highlight">
                            {searchedInputCountyValue !== ''
                                ? searchedInputCountyValue
                                : '全部縣市'}
                        </span>
                    </div>
                </SearchInfo>
            </SearchResultsTitle>
            <SearchResultsContainer>
                <InfiniteScroll
                    dataLength={results.length}
                    next={fetchMoreNum}
                    hasMore={hasMore} // Replace with a condition based on your data source
                    loader={Array(8)
                        .fill(0)
                        .map((item, i) => (
                            <StyledCardSkeletonContainer key={i}>
                                <CardSkeleton />
                            </StyledCardSkeletonContainer>
                        ))}
                    endMessage={
                        <StyledEndMsg>
                            <div>已經到底囉！</div>
                        </StyledEndMsg>
                    }
                >
                    {(status === undefined ||
                        status === 'loading' ||
                        status === 'cancel') &&
                        Array(8)
                            .fill(0)
                            .map((item, i) => (
                                <StyledCardSkeletonContainer key={i}>
                                    <CardSkeleton />
                                </StyledCardSkeletonContainer>
                            ))}
                    {status === 'success' &&
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
                                Description,
                                DescriptionDetail,
                            } = item;

                            let transferedTime = transferTime(
                                OpenTime,
                                StartTime,
                                EndTime
                            );

                            let convertImgUrl =
                                convertGoogleDriveURL(PictureUrl1);

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
                                    address={Address ? Address : '詳見官網'}
                                    text={t(`carouselConfig.openTime`)}
                                    iconClass="fa-solid fa-location-dot"
                                />
                            );
                        })}
                    {status === 'success' &&
                        !results &&
                        t(`searchConfig.noResults`)}
                </InfiniteScroll>
            </SearchResultsContainer>
            {/* {status === 'success' && (
                <PaginationContainer>
                    <Pagination
                        page={page}
                        pageSize={pageSize}
                        total={totalPages}
                        onChange={setPage}
                        withEllipsis
                    />
                </PaginationContainer>
            )} */}
        </Container>
    );
};

export default SearchResults;
