import merge from 'lodash/merge';

// 預設主題
const theme = {
    colors: {
        primary: '#2F798C',
        secondary: '#71D664',
        disable: '#DADADA',
        success: '#5EB253',
        info: '#60A6F8',
        warning: '#FFC05A',
        danger: '#C40D23',
        black: '#33484B',
        white: '#FFFFFF',
        grey4: '#404040',
        grey3: '#D8D8D8',
        grey2: '#808080',
        // grey1: '#D9E0E2'
        grey1: '#F1F1F1',
        // grey0: '#FAFAFA',
        grey0: '#F2F2F2',
        transparent: 'transparent',
    },
    typography: {
        h1: { fontSize: '6rem' },
        h2: { fontSize: '4.5rem' },
        h3: { fontSize: '3.75rem' },
        h4: { fontSize: '3rem' },
        h5: { fontSize: '2.25rem' },
        h6: { fontSize: '1.75rem' },
        content: { fontSize: '1rem' },
    },
    fontSize: {
        xs: '0.875rem',
        sm: '1rem',
        md: '1.125rem',
        lg: '1.5rem',
        xl: '2rem',
        xxl: '3rem',
    },
    radius: 4,
    spacing: 1, // rem
    getSpacing: (num = 1) => {
        return 4 * num + 'rem';
    },
};

// TODO:深色主題

// TODO:深色主題

// 自訂主題
// const customTheme ={

// }

export const createTheme = (customTheme) => {
    return merge(customTheme, theme);
};

export default theme;
