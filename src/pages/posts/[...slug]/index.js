import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { LOCALES } from '@/configs/i18nConfigs';

export async function getStaticPaths() {
    LOCALES.forEach((locale) => {
        paths.push(...allPosts.map((post) => `/${locale}${post.path}`));
    });
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps(context, params) {
    console.log('context', context);
    const { slug } = context.params;
    const locale = context.locale;
    return {
        // props: {
        //     products: data.products,
        //     ...(await serverSideTranslations(locale, ['indexPage', 'common'])),
        // },
    };
}
