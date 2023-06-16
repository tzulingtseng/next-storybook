// import Image from 'next/image';
import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';

import { Inter } from 'next/font/google';
import path from 'path';
import fs from 'fs/promises';

import Link from 'next/link';
import ThemeProvider from '@/lib/ThemeProvider';
import theme from '@/lib/theme';
import NavBar from '@/lib/NavBar';
import Card from '@/lib/Card';
import Button from '@/lib/Button';
import { Icon } from '@/lib';
import Meta from '@/lib/Card/Meta';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import getActivityAPI from '@/api/getActivityAPI';
import useGetActivity from '@/features/home/hooks/useGetActivity';

import axios from 'axios';
import { API_HOSTNAME_URL } from '@/config';
import { getAuthorizationHeader } from '@/utils/getAuthorizationHeader';

const Container = styled('div')`
    width: 100%;
    height: 100vh;
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

const Travel = (props) => {
    const { products } = props;

    const { locale, locales, push } = useRouter();
    const changeLanguage = (l) => () => {
        push('/', undefined, { locale: l });
        // push('/about', undefined, { locale: l });
    };
    const { t } = useTranslation('home');

    // const {
    //     status: activityStatus,
    //     data: activityData,
    //     error: activityError,
    // } = useGetActivity();
    // console.log(activityStatus, activityData, activityError);

    const useGetActivityLog = useGetActivity();
    console.log('useGetActivityLog', useGetActivityLog);

    return (
        <>
            <ThemeProvider theme={theme}>
                <NavBar locale={locale}></NavBar>
                <h1>{t('title')}</h1>
                <div>
                    <h3>With Link</h3>
                    <h1>Choose your locale:</h1>
                    {locales.map((l) => (
                        <button key={l}>
                            <Link href={'/tdx'} locale={l}>
                                {l}
                            </Link>
                        </button>
                    ))}
                </div>
                <Card
                    cover={
                        <img
                            src="https://www.eastcoast-nsa.gov.tw/image/426/640x480"
                            alt=""
                            style={{ objectFit: 'cover' }}
                        />
                    }
                    children={
                        <Meta
                            avatarUrl="https://ithelp.ithome.com.tw/static/2021ironman/event/img/choose1.png"
                            title="2021 iThome 鐵人賽"
                            description="喚醒心中最強大的鐵人"
                            address="連江縣莒光鄉林坳嶼"
                            text="開放時間"
                            icon="fa-solid fa-thumbs-up"
                        />
                    }
                    footer={
                        <Fragment>
                            {/* <Actions>
                                <Icon
                                    icon="fa-solid fa-thumbs-up"
                                    size={20}
                                ></Icon>
                                <Icon
                                    icon="fa-solid fa-share-nodes fa-rotate-270"
                                    size={20}
                                ></Icon>
                            </Actions> */}
                            <Actions>
                                <Button
                                    style={{
                                        width: '100%',
                                        marginBottom: '16px',
                                    }}
                                    variant="outlined"
                                >
                                    查看詳情
                                </Button>
                            </Actions>
                        </Fragment>
                    }
                ></Card>
                <Container></Container>
            </ThemeProvider>
        </>
    );
};

// export async function getServerSideProps({ locale }) {
export async function getStaticProps({ locale }) {
    // const filePath = path.join(process.cwd(), 'data', 'backend.json');
    // const jsonData = await fs.readFile(filePath);
    // const data = JSON.parse(jsonData);
    // console.log('data', data);
    // const res = await axios
    //     .get(`https://${API_HOSTNAME_URL}/Tourism/ScenicSpot?$top=30&$format=JSON`, {
    //         headers: getAuthorizationHeader(),
    //     })

    // console.log('res', res.data);
    return {
        props: {
            // products: data.products,
            ...(await serverSideTranslations(locale, [
                'common',
                'about',
                'home',
            ])),
        },
    };
}

export default Travel;
