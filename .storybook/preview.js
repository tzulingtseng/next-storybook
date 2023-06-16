/** @type { import('@storybook/react').Preview } */
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/theme';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    layout: 'centered',
    options: {
        storySort: { order: ['Introduction', 'Components', 'Example'] },
    },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

export const decorators = [
    (Story) => {
        const { default: defaultTheme, dark: darkTheme } = theme;
        const currentTheme = defaultTheme;

        return (
            <ThemeProvider theme={currentTheme}>
                <Story />
            </ThemeProvider>
        );
    },
];
