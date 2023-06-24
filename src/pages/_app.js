import { ThemeProvider } from 'styled-components';
import { appWithTranslation } from 'next-i18next';
import '@/styles/globals.css';
import GlobalStyle from '@/styles/GlobalStyle';

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
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
};

export default appWithTranslation(App);
