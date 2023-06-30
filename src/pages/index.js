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

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import NavBar from '@/lib/NavBar';

const Container = styled('div')`
    width: 100%;
    height: 100vh;
`;

const Home = (props) => {
    const { products } = props;
    const { locale, locales, push } = useRouter();
    const changeLanguage = (l) => () => {
        push('/', undefined, { locale: l });
        // push('/about', undefined, { locale: l });
    };
    const { t } = useTranslation('home');
    // console.log('locale', locale);
    // console.log('t', t('title'));
    return (
        <>
            <ThemeProvider theme={theme}>
                <NavBar locale={locale}></NavBar>
                <h1>{t('title')}</h1>
                <h2></h2>
                {/* <ul>
                <li className="text-3xl font-bold underline">route</li>
                <li>
                    <Link href="/events">/events</Link>
                </li>
                <li>
                    <Link href="/events/123">/events/123</Link>
                </li>
                <li>
                    <Link href="/events/2021/12">/events/date</Link>
                </li>
            </ul>
            <ul>
                <li className="text-3xl font-bold underline">fetching data</li>
                {products.map((product) => (
                    <li key={product.id}>{product.title}</li>
                ))}
            </ul>
            <hr></hr> */}
                {/* <h1>locale:{locale}</h1> */}
                {/* <div>
                <h3>With useRouter</h3>
                <h1>Choose your locale:</h1>
                {locales.map((l) => (
                    <button key={l} onClick={changeLanguage(l)}>
                        {l}
                    </button>
                ))}
            </div> */}
                <div>
                    <h3>With Link</h3>
                    <h1>Choose your locale:</h1>
                    {locales.map((l) => (
                        <button key={l}>
                            <Link href={'/'} locale={l}>
                                {l}
                            </Link>
                        </button>
                    ))}
                </div>
                {/* <div>
                    <h3>Go to about page</h3>
                    <h1>Choose your locale:</h1>
                    {locales.map((l) => (
                        <button key={l}>
                            <Link href={'/about'} locale={l}>
                                {l}
                            </Link>
                        </button>
                    ))}
                </div> */}
                <Container></Container>
            </ThemeProvider>
        </>
    );
};

export async function getStaticProps({ locale }) {
    const filePath = path.join(process.cwd(), 'data', 'backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    // console.log('data', data);
    return {
        props: {
            // products: data.products,
            ...(await serverSideTranslations(locale, ['common', 'about'])),
        },
    };
}

export default Home;
