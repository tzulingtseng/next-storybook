import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Link from 'next/link';

const About = () => {
    const { locale } = useRouter();
    const { t } = useTranslation('about');
    // console.log('locale', locale);
    // console.log('t', t);

    return (
        <>
            <h1>locale:{locale}</h1>
            <h2>{t('title')}</h2>
            <h2>
                <Link href="/" locale={locale}>
                    Go to home
                </Link>
            </h2>
        </>
    );
};
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['about'])),
        },
    };
}

export default About;
