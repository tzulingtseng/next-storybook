import Head from 'next/head';
import { useRouter } from 'next/router';

import { WEB_HOSTNAME_URL } from '@/config/config';
import siteMetaData from '@/config/siteMetaData';

/**
 * -------------------------------------------------------------------------------------------
 * Utils: SEO 處理
 * 說明: 在page引入該function，能自動完成基本meta data基本設定。
 * @param  {string}         [title]         網頁標題
 * @param  {string}         [description]   網頁說明文字
 * @param  {string}         [type]          該頁類型，ex: webiste, article...
 * @param  {string|array}   [keywords]      關鍵字
 *                                          ex:
 *                                           'aaa,bbb,ccc,ddd'
 *                                           ['abc','aaa','bbb']
 * @param  {string}         [image]         封面圖片位置
 *
 * @return {html}
 */
const SEO = ({
    title = undefined,
    description = undefined,
    type = undefined,
    keywords = undefined,
    image = undefined,
}) => {
    /** ---------------------------------------------------------------------------------------------
     * Basic
     */
    const router = useRouter();

    /** ---------------------------------------------------------------------------------------------
     * final output
     */
    const outputData = {
        title:
            typeof title === 'string'
                ? title + ' | ' + siteMetaData.title
                : siteMetaData.title,
        description:
            typeof description === 'string'
                ? description
                : siteMetaData.description,
        type: typeof type === 'string' ? type : 'website',
        keywords:
            typeof keywords === 'string' || Array.isArray(keywords)
                ? keywords
                : siteMetaData.keywords,
        url: `https://${WEB_HOSTNAME_URL}${router.asPath}`,
        image: typeof image === 'string' ? image : siteMetaData.image,
    };

    // ---------------------------------------------------------------------------------------------

    return (
        <Head>
            {/* normal */}
            <title>{outputData.title}</title>
            <link rel="icon" href={outputData.image} />
            <meta name="keywords" content={outputData.keywords} />
            <meta name="description" content={outputData.description} />

            {/* FB */}
            <meta property="og:type" content={outputData.type} />
            <meta property="og:title" content={outputData.title} />
            <meta property="og:description" content={outputData.description} />
            <meta property="og:url" content={outputData.url} />
            <meta property="og:image" content={outputData.image} />
        </Head>
    );
};

export default SEO;
