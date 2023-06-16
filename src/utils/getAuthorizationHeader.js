import jsSHA from 'jssha';
import { TDXKey, TDXId } from '@/config/';

/**
 * Utils: 取得 API 驗證
 * @param  {...any} args
 * 
 * @return {object}
 */
export function getAuthorizationHeader() {
    let GMTString = new Date().toGMTString();
    let ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(TDXKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    let HMAC = ShaObj.getHMAC('B64');
    let Authorization =
        'hmac username="' +
        TDXId +
        '", algorithm="hmac-sha1", headers="x-date", signature="' +
        HMAC +
        '"';
    return { Authorization: Authorization, 'X-Date': GMTString };
}