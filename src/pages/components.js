import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import ThemeProvider from '@/lib/ThemeProvider';
import { theme } from '../theme';
import Button from '@/lib/Button';
import Switch from '@/lib/Switch';
import Icon from '@/lib/Icon';

const Components = () => {
    // TODO:深色主題
    const { default: defaultTheme, dark: darkTheme } = theme;

    const [isDarkMode, setIsDarkMode] = useState(false);

    // 根據當前的模式選擇主題
    // const currentTheme = isDarkMode ? darkTheme : defaultTheme;
    const currentTheme = defaultTheme;

    // 切換模式
    const toggleMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <>
            <ThemeProvider theme={currentTheme}>
                <Fragment>
                    <h1>hi components</h1>
                    <Button>Button</Button>
                    {/* <Switch checked={isDarkMode} onChange={toggleMode} /> */}
                    {/* <Switch></Switch> */}
                </Fragment>
            </ThemeProvider>
        </>
    );
};

export default Components;
