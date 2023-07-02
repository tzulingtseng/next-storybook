import { i18n } from 'next-i18next';
import axios from 'axios';

import { API_HOSTNAME_URL } from 'src/config/';
import { getAuthorizationHeader } from '@/utils/getAuthorizationHeader';

const getActivityAPI = async ({
    top = undefined,
    skip = undefined,
    // filter = 'Picture/PictureUrl1 ne null',
    filter = undefined,
    select = undefined,
}) => {
    let returnData = {
        status: undefined,
        desc: undefined,
        data: undefined,
        // pagination: undefined,
    };

    /**
     * api query parameter
     */
    let params = {
        $top: top,
        $skip: skip,
        $format: 'JSON',
        $filter: filter,
        // $spatialFilter: spatialFilter,
        $select: select,
    };

    await axios
        .get(`https://${API_HOSTNAME_URL}/v2/Tourism/Activity`, {
            // TODO: 研究 useEffect 怎麼控制
            // signal: typeof signal === 'object' ? signal : undefined,
            params,
            headers: getAuthorizationHeader(),
            validateStatus: (status) => {
                return status < 600; // 有效的 HTTP 狀態碼範圍是從 100 到 599
            },
        })
        .then((response) => {
            if (response.status === 200) {
                // handle success
                returnData = {
                    status: 'success',
                    data: response.data,
                };
            } else {
                // handle error
                // 處理回應資料時出現錯誤，如：日誌記錄錯誤訊息、顯示錯誤提示給使用者
                returnData = {
                    status: 'error',
                    desc: i18n.t(response.status, { ns: 'api_mapping' }),
                };
            }
        })
        .catch((error) => {
            if (error.__CANCEL__) {
                // handle cancel 請求取消
                returnData = {
                    status: 'cancel',
                    desc: i18n.t('cancel', { ns: 'api_mapping' }),
                };
            } else {
                // handle error
                // 專門處理請求本身的錯誤，例如網絡連接錯誤、請求超時、無法發送請求等等
                returnData = {
                    status: 'error',
                    desc: i18n.t('error', { ns: 'api_mapping' }),
                };
            }
        });
    return returnData;
};

export default getActivityAPI;
