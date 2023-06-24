import React from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment-timezone';

import Container from '@/components/Container';
import CardContainer from '@/components/CardContainer';
import Pagination from '@/lib/Pagination';

const SearchResultsTitle = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const SearchInfo = styled.div`
    display: flex;
    .highlight {
        color: #2f798c;
    }
`;

const SearchResultsContainer = styled.div`
    // width: calc(100% + 10px * 2);
    width: 100%;
    // height: auto;
    display: flex;
    flex-wrap: wrap;
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px 0;
`;

const SearchResults = ({
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
    return (
        <Container>
            <SearchResultsTitle>
                <div>搜尋結果：</div>
                <SearchInfo>
                    <div>
                        關鍵字：
                        <span className="highlight">
                            {searchedInputValue ? searchedInputValue : '無'}
                        </span>
                        ，
                    </div>
                    <div>
                        地區：
                        <span className="highlight">
                            {searchedInputCountyValue
                                ? searchedInputCountyValue
                                : '無'}
                        </span>
                        ，
                    </div>
                    <div>
                        共
                        <span className="highlight">
                            {results ? results.length : 0}
                        </span>
                        筆資料
                    </div>
                </SearchInfo>
            </SearchResultsTitle>
            <SearchResultsContainer>
                {PageDataArray
                    ? PageDataArray.map((item) => {
                          const {
                              Picture: { PictureUrl1 = null } = {},
                              StartTime,
                              EndTime,
                              Address = '詳見官網',
                              ActivityID,
                              ActivityName,
                              ScenicSpotID,
                              ScenicSpotName,
                              RestaurantID,
                              RestaurantName,
                          } = item;

                          const openTime = `${moment(StartTime, moment.ISO_8601)
                              .tz('Asia/Taipei')
                              .format('YYYY-MM-DD')} ~ ${moment(
                              EndTime,
                              moment.ISO_8601
                          )
                              .tz('Asia/Taipei')
                              .format('YYYY-MM-DD')}`;

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
                                  itemName={itemName}
                                  openTime={openTime}
                                  Address={Address}
                              ></CardContainer>
                          );
                      })
                    : '目前沒有符合的搜尋結果'}
            </SearchResultsContainer>
            <PaginationContainer>
                <Pagination
                    page={page}
                    pageSize={pageSize}
                    total={totalPages}
                    onChange={setPage}
                    withEllipsis
                />
            </PaginationContainer>
        </Container>
    );
};

export default SearchResults;
