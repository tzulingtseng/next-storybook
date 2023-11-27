import jsSHA from 'jssha';
import { TDXKey, TDXId } from '@/config/config';

/**
 * Utils: 取得 API 驗證
 * @param  {...any} args
 *
 * @return {object}
 */
// export function getAuthorizationHeader() {
//     let GMTString = new Date().toGMTString();
//     let ShaObj = new jsSHA('SHA-1', 'TEXT');
//     ShaObj.setHMACKey(TDXKey, 'TEXT');
//     ShaObj.update('x-date: ' + GMTString);
//     let HMAC = ShaObj.getHMAC('B64');
//     let Authorization =
//         'hmac username="' +
//         TDXId +
//         '", algorithm="hmac-sha1", headers="x-date", signature="' +
//         HMAC +
//         '"';
//     return { Authorization: Authorization, 'X-Date': GMTString };
// }

export async function getAuthorizationHeader() {
    try {
        const parameter = {
            grant_type: 'client_credentials',
            client_id: TDXId,
            client_secret: TDXKey,
        };

        let auth_url =
            'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token';

        const response = await fetch(auth_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(parameter).toString(),
        });

        if (!response.ok) {
            throw new Error('無法擷取存取權杖');
        }

        const data = await response.json();

        // const now = new Date();
        // const item = {
        //     name: 'token',
        //     value: data.access_token,
        //     expires: now.getTime() + 5,
        //     startTime: new Date().getTime(),
        // };
        // if (typeof window == 'undefined') {
        //     console.log('localStorage');
        //     localStorage.setItem(JSON.stringify(item));
        // }

        return data.access_token;
    } catch (error) {
        console.error('擷取存取權杖時發生錯誤：', error);
        return null;
    }
}

export async function getApiResponse({ url, params, accessToken }) {
    try {
        const queryString = Object.entries(params)
            .filter(([key, value]) => value !== undefined)
            .map(
                ([key, value]) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            )
            .join('&');

        const apiUrl = url + (queryString ? `?${queryString}` : '');

        const response = await fetch(apiUrl, {
            method: 'GET',
            params,
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        });

        if (!response.ok) {
            throw new Error('無法擷取 API 回應');
        }

        const data = await response.json();
        // console.log('API 回應：', data.length);
        // 根據需要處理資料
        return data;
    } catch (error) {
        // console.error('擷取 API 回應時發生錯誤：', error);
        throw error; // 重新拋出錯誤，讓呼叫方能夠處理
    }
}
