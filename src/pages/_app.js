import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { appWithTranslation } from 'next-i18next';
import '@/styles/globals.css';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

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
