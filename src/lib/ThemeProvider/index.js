import React from 'react';
import { ThemeProvider as BasicThemeProvider } from 'styled-components';

const ThemeProvider = ({ theme, children }) => {
    return <BasicThemeProvider theme={theme}>{children}</BasicThemeProvider>;
};

export default ThemeProvider;
