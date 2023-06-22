import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';

import ThemeProvider from '@/lib/ThemeProvider';
import theme from '@/lib/theme';
import Footer from '@/lib/Footer';
import Card from '@/lib/Card';
import Meta from '@/lib/Card/Meta';
import Button from '@/lib/Button';
import Pagination from '@/lib/Pagination';
import TextField from '@/lib/TextField';
import Select from '@/lib/Select';

import NoImage from '@/components/NoImage';

import BannerActivities from '@/assets/images/activities/banner-activities.png';

import useGetActivity from '@/features/home/hooks/useGetActivity';

import { isObject } from '@/utils/isObject';
import { dateTransfer } from '@/utils/dateTransfer';
import scrollToTop from '@/utils/scrollToTop';

const Container = styled.div`
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
`;

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

const Actions = styled.div`
    padding: 8px 16px;
    color: #888;
    i {
        cursor: pointer;
    }
    & > *:not(:first-child) {
        margin-left: 20px;
    }
`;

const BannerContainer = styled.div`
    width: 100%;
    position: relative;
`;

const BannerContentBox = styled.div`
    width: 500px;
    height: 200px;
    background-color: rgba(216, 216, 216, 0.5);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BannerTitle = styled.div``;

const BannerSearchContainer = styled.div``;

const BannerContent = styled.div``;

const SearchResults = styled.div`
    // width: calc(100% + 10px * 2);
    width: 100%;
    // height: auto;
    display: flex;
    flex-wrap: wrap;
`;

const CardContainer = styled.div`
    margin: 0 10px;
    margin-bottom: 20px;
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px 0;
`;

const activities = () => {
    // console.log('activityData', activityData);
    const [page, setPage] = useState(null);
    const [pageSize, setPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(0);
    const [PageDataArray, setPageDataArray] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [inputCountyValue, setInputCountyValue] = useState('');
    const [searchedInputValue, setSearchedInputValue] = useState('');
    const [searchedInputCountyValue, setSearchedInputCountyValue] =
        useState('');
    const [results, setResults] = useState([]);

    const router = useRouter();
    const { query } = useRouter(); // client side
    const { slug } = router.query;
    // console.log('query', query);
    // console.log('page', page);

    const {
        status: activityStatus,
        data: activityData,
        error: activityError,
    } = useGetActivity({ top: null });

    /**
     *
     * @param {*} a
     * @param {*} b
     * @returns duplicates 重複的物件
     */
    const findDuplicates = (a, b) => {
        const duplicates = [];

        for (const objA of a) {
            for (const objB of b) {
                if (objA.ActivityID === objB.ActivityID) {
                    duplicates.push(objA);
                    break;
                }
            }
        }

        return duplicates;
    };

    // const findDuplicates = (a, b) => {
    //     return a.filter((objA) =>
    //         b.some((objB) => objA.ActivityID === objB.ActivityID)
    //     );
    // };

    const handleFilteredResults = () => {
        setSearchedInputValue(inputValue);
        setSearchedInputCountyValue(inputCountyValue);
        if (!activityData) return;
        const keyword = searchedInputValue.toLowerCase();
        const countyKeyword = searchedInputCountyValue.toLowerCase();

        // 關鍵字針對地址和活動名稱的搜尋
        const filteredKeyword = activityData.filter((activity) => {
            const activityName = activity.ActivityName.toLowerCase();
            const address = activity.Address
                ? activity.Address.toLowerCase()
                : '';
            return activityName.includes(keyword) || address.includes(keyword);
        });

        // 地區關鍵字針對地址的搜尋
        const filteredCountyKeyword = activityData.filter((activity) => {
            const address = activity.Address
                ? activity.Address.toLowerCase()
                : '';
            return address.includes(countyKeyword);
        });

        // 進階搜尋：用地區關鍵字搜尋結果，篩掉關鍵字搜尋結果，返回重複部分
        const mergedResults = findDuplicates(
            filteredKeyword,
            filteredCountyKeyword
        );

        let filteredResults = [];
        if (keyword && countyKeyword) {
            filteredResults = mergedResults;
        } else if (countyKeyword) {
            filteredResults = filteredCountyKeyword;
        } else if (keyword) {
            filteredResults = filteredKeyword;
        } else {
            filteredResults = activityData; // 如果沒有關鍵字輸入，返回所有資料
        }

        // if (filteredResults.length === 0) {
        //     // 處理沒有符合關鍵字的搜尋結果
        //     // 可以在這裡添加相應的處理邏輯，例如顯示提示訊息或執行其他操作
        // }

        setResults(filteredResults);
    };

    useEffect(() => {
        // 當頁面載入時，回到頁面頂部
        scrollToTop(true);
        if (activityStatus !== 'success') return;
        handleFilteredResults();
    }, [activityData]);

    useEffect(() => {
        if (!results) return;
        // 換頁時，回到頁面頂部
        scrollToTop(true);
        const chunkedData = Array.from(
            { length: Math.ceil(results.length / pageSize) },
            (_, index) =>
                results.slice(index * pageSize, (index + 1) * pageSize)
        );
        setPageDataArray(chunkedData[page - 1]);
        setTotalPages(results.length);
        // if (results.length === 0) setPage(undefined);

        // http://localhost:3000/?page=1
        // http://localhost:3000/travel/activities?page=2
        const query = {
            keyword: inputValue,
            area: inputCountyValue,
            page: page > 1 ? page : undefined, // page>1，出現參數 page
        };
        /**
         * 處理不同情境下的查詢參數
         */
        const queryString = Object.entries(query)
            .filter(([key, value]) => value !== undefined && value !== '')
            .map(([key, value]) => `?${key}=${encodeURIComponent(value)}`)
            .join('&');

        router.push(`/travel/activities/search${queryString}`, undefined, {
            shallow: true,
        });
    }, [page, results]);
    /**
     * 處理當頁碼不等於1時，有新的關鍵字和地區關鍵字搜尋
     */
    useEffect(() => {
        handleFilteredResults();
        setPage(1);
    }, [searchedInputValue, searchedInputCountyValue]);

    /**
     * TODO:
     * 1. 頁碼=1時，url 不顯示 page 參數，頁碼>2時，才顯示 -> done
     * 2. 換新頁碼、上一頁、下一頁時，回到最上方 -> done
     * 3. 有新搜尋關鍵字時，回到頁面最上方
     * 4. 當 url 有參數時，複製 url 再貼上，要顯示有參數的搜尋結果
     */

    return (
        <ThemeProvider theme={theme}>
            <div>
                <BannerContainer>
                    <Image src={BannerActivities} alt="activities" />
                    <BannerContentBox>
                        <BannerContent>
                            <BannerTitle>尋找景點</BannerTitle>
                            <BannerSearchContainer>
                                <TextField
                                    onChange={(e) =>
                                        setInputValue(e.target.value)
                                    }
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
                                <Button onClick={handleFilteredResults}>
                                    搜尋
                                </Button>
                            </BannerSearchContainer>
                        </BannerContent>
                    </BannerContentBox>
                </BannerContainer>
                <Container>
                    <SearchResultsTitle>
                        <div>搜尋結果：</div>
                        <SearchInfo>
                            <div>
                                關鍵字：
                                <span className="highlight">
                                    {inputValue ? inputValue : '無'}
                                </span>
                                ，
                            </div>
                            <div>
                                地區：
                                <span className="highlight">
                                    {inputCountyValue ? inputCountyValue : '無'}
                                </span>
                                ，
                            </div>
                            <div>
                                共
                                <span className="highlight">
                                    {results && results.length
                                        ? results.length
                                        : 0}
                                </span>
                                筆資料
                            </div>
                        </SearchInfo>
                    </SearchResultsTitle>
                    <SearchResults>
                        {PageDataArray
                            ? PageDataArray.map((item) => {
                                  return (
                                      <CardContainer key={item.ActivityID}>
                                          <Card
                                              cover={
                                                  isObject(
                                                      item.Picture,
                                                      'PictureUrl1'
                                                  ) ? (
                                                      <img
                                                          src={
                                                              item.Picture
                                                                  .PictureUrl1
                                                          }
                                                          alt={
                                                              item.ActivityName
                                                          }
                                                      />
                                                  ) : (
                                                      <NoImage />
                                                  )
                                              }
                                              children={
                                                  <Meta
                                                      // avatarUrl={item.Picture.PictureUrl1}
                                                      title={item.ActivityName}
                                                      description={
                                                          isObject(
                                                              item,
                                                              'StartTime'
                                                          )
                                                              ? dateTransfer(
                                                                    item.StartTime
                                                                ) +
                                                                '~' +
                                                                dateTransfer(
                                                                    item.EndTime
                                                                )
                                                              : '詳見官網'
                                                      }
                                                      address={
                                                          isObject(
                                                              item,
                                                              'Address'
                                                          )
                                                              ? item.Address
                                                              : '詳見官網'
                                                      }
                                                      text="開放時間"
                                                      icon="fa-solid fa-thumbs-up"
                                                  />
                                              }
                                              footer={
                                                  <Actions>
                                                      <Button
                                                          style={{
                                                              width: '100%',
                                                              marginBottom:
                                                                  '16px',
                                                          }}
                                                          variant="outlined"
                                                      >
                                                          查看詳情
                                                      </Button>
                                                  </Actions>
                                              }
                                          ></Card>
                                      </CardContainer>
                                  );
                              })
                            : '目前沒有符合的搜尋結果'}
                    </SearchResults>
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
            </div>
            <Footer></Footer>
        </ThemeProvider>
    );
};

export default activities;
