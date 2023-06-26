import { ThemeProvider } from 'styled-components';
import { appWithTranslation } from 'next-i18next';
import '@/styles/globals.css';
import GlobalStyle from '@/styles/GlobalStyle';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const theme = {
    colors: {
        primary: '#0070f3',
    },
};

const App = ({ Component, pageProps }) => {
    return (
        <>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <SkeletonTheme baseColor="#FFFFFF" highlightColor="#D8D8D8">
                    <Component {...pageProps} />
                </SkeletonTheme>
            </ThemeProvider>
        </>
    );
};

export default appWithTranslation(App);
