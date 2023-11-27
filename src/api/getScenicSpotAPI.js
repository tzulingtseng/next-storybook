import { i18n } from 'next-i18next';
import axios from 'axios';

import { API_HOSTNAME_URL } from '@/config/config';
import { getApiResponse } from '@/utils/getAuthorizationHeader';

const getScenicSpotAPI = async ({
    top = undefined,
    skip = undefined,
    filter = undefined,
    area = undefined,
    spatialFilter = undefined,
    accessToken = undefined,
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
        $format: 'JSON',
        $top: top,
        $skip: skip,
        $filter: filter,
        $spatialFilter: spatialFilter,
        // $select: select,
    };
    try {
        const response = await getApiResponse({
            url: `https://${API_HOSTNAME_URL}/v2/Tourism/ScenicSpot${
                area ? '/' + area : ''
            }`,
            params,
            accessToken,
        });

        if (response.length > 0) {
            returnData = {
                status: 'success',
                data: response,
            };
        } else {
            returnData = {
                status: 'error',
                // desc: i18n.t(response.status, { ns: 'api_mapping' }),
            };
        }
    } catch (error) {
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
                // desc: i18n.t('error', { ns: 'api_mapping' }),
            };
        }
    }
    return returnData;
};

export default getScenicSpotAPI;
