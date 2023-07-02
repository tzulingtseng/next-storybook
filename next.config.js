/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const path = require('path');
const nextConfig = {
    reactStrictMode: true,
    i18n,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
            };
        }
        return config;
    },
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: {
            displayName: true,
            ssr: true,
        },
    },
};

module.exports = nextConfig;
