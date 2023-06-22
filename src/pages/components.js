import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import ThemeProvider from '@/lib/ThemeProvider';
import { theme } from '../theme';
import Button from '@/lib/Button';
import Switch from '@/lib/Switch';
import Icon from '@/lib/Icon';
// import Dialog from '@/lib/Dialog';
import ErrorMessage from '@/lib/ErrorMessage';
import Radio from '@/lib/Radio';
import Carousel from '@/lib/Carousel';
import Dropdown from '@/lib/Dropdown';
// import Alert from '@/lib/Alert';
import Message from '@/lib/Message';

const styles = {
    button: {
        marginRight: 8,
    },
    card: {
        width: '100%',
        maxWidth: '1000px',
        minWidth: '400px',
    },
};

const Components = () => {
    // TODO:深色主題
    const { default: defaultTheme, dark: darkTheme } = theme;

    const [isDarkMode, setIsDarkMode] = useState(false);

    // 根據當前的模式選擇主題
    // const currentTheme = isDarkMode ? darkTheme : defaultTheme;
    const currentTheme = defaultTheme;

    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);

    // 切換模式
    const toggleMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <>
            <ThemeProvider theme={currentTheme}>
                <Fragment>
                    <Button>Button</Button>
                    {/* <Switch checked={isDarkMode} onChange={toggleMode} /> */}
                    <Switch></Switch>
                    <Radio></Radio>
                    <Message
                        content="提示訊息"
                        open={open}
                        onClose={() => setOpen(false)}
                    >
                        顯示信息彈窗的內容..
                    </Message>
                    <Button onClick={() => setOpen(true)}>Show Message</Button>
                    {dialogOpen && (
                        <Dialog
                            style={styles.card}
                            title="提示信息"
                            dialogOpen={dialogOpen}
                            onCancel={() => setDialogOpen(false)}
                            onConfirm={() => setDialogOpen(false)}
                        >
                            顯示信息彈窗的內容..
                        </Dialog>
                    )}
                    <Button
                        variant="outlined"
                        onClick={() => setDialogOpen(true)}
                    >
                        Show Dialog
                    </Button>
                    {/* <Alert
                        style={styles.card}
                        title="警示信息"
                        alertDialogOpen={alertDialogOpen}
                        onCancel={() => setAlertDialogOpen(false)}
                        onConfirm={() => setAlertDialogOpen(false)}
                    >
                        顯示信息彈窗的內容...
                    </Alert> */}
                    <Button
                        variant="text"
                        onClick={() => setAlertDialogOpen(true)}
                    >
                        Show Alert Dialog
                    </Button>
                    {/* <Carousel></Carousel> */}
                    {/* <Dropdown></Dropdown> */}
                </Fragment>
            </ThemeProvider>
        </>
    );
};

export default Components;
