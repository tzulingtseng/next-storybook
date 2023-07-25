const path = require('path');
module.exports = {
    i18n: {
        defaultLocale: 'zh-Hant',
        locales: ['zh-Hant', 'en'], // 設定支援的語言列表
        localeDetection: false
    },
    // 對於某些 serverless PaaS（如Vercel和Netlify），在使用serverSideTranslations時可能無法正確定位到翻譯文件的路徑，因此需要進行額外的配置。如果您在使用serverSideTranslations時遇到檔案系統問題，請將config.localePath設置為使用path.resolve。
    localePath: path.resolve('./public/locales'),
};
