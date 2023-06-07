/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // swcMinify: true,
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: {
            displayName: true,
            ssr: true,
        },
    },
};

module.export = nextConfig;
