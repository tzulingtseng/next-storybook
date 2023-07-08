// https://drive.google.com/file/d/1sTBlDyxqpVFArapy8jDR_gC_SeWjgqJa/view?usp=sharing
//drive.google.com/file/d/idparam/view?usp=sharing

// https://drive.google.com/uc?export=view&id=idparam
const convertGoogleDriveURL = (url) => {
    const regex = /\/d\/([^\/]+)\//;
    const match = regex.exec(url);
    if (!match || match.length < 2) {
        // console.log('Invalid Google Drive URL');
        return url;
    }

    const idparam = match[1];
    const convertedURL = url.replace('/file/d/', '/uc?export=view&id=');

    const finalURL = convertedURL.split('/view?usp=sharing')[0];
    if (finalURL.includes(idparam)) {
        return finalURL;
    } else {
        console.log('Mismatched idparam in the converted URL');
        return;
    }
};
export default convertGoogleDriveURL;
