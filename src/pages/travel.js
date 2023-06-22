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
import Footer from '@/lib/Footer';
import ActivityCarouselCards from '@/components/ActivityCarouselCards';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import useGetActivity from '@/features/home/hooks/useGetActivity';

const Container = styled('div')`
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    height: auto;
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

    const {
        status: activityStatus,
        data: activityData,
        error: activityError,
    } = useGetActivity({ top: 10 });

    // const { data: activityData } = useGetActivity()
    // const useGetActivityLog = useGetActivity();
    // console.log('activityData', activityData);

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
                <Container>
                    {activityStatus === 'success' && (
                        <ActivityCarouselCards lists={activityData} />
                    )}
                </Container>
                <Footer></Footer>
            </ThemeProvider>
        </>
    );
};

export async function getStaticProps({ locale }) {
    // const filePath = path.join(process.cwd(), 'data', 'backend.json');
    // const jsonData = await fs.readFile(filePath);
    // const data = JSON.parse(jsonData);
    // console.log('data', data);

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
