/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/nextjs',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    webpackFinal: async (config, { configType }) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            'next-i18next': 'react-i18next',
        };
        return config;
    },
};
export default config;
