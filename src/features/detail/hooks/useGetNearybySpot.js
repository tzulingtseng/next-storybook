import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment-timezone';

import { getAuthorizationHeader } from '@/utils/getAuthorizationHeader';
import getActivityAPI from '@/api/getActivityAPI';
import getScenicSpotAPI from '@/api/getScenicSpotAPI';
import getRestaurantAPI from '@/api/getRestaurantAPI';

/** -------------------------------------------------------------------------------------------------------------------
 * 取得附近資料 API
 * @param  {string}    queryType     query ('scenicSpot', 'restaurant', 'hotel', 'activity')
 * @param  {object}    position      所在地
 *
 * @return {undefined|string}    status       API 狀態
 *                                            - undefined: 初始
 *                                            - "loading": 讀取
 *                                            - "success": 成功
 *                                            - "error"  : 失敗
 *                                            - "cancel" : 取消
 * @return {undefined|array}     data         存 api 回傳的資料
 * @return {undefined|object}    pagination   存 api 回傳的分頁資料
 * @return {undefined|string}    error        error message
 */

const useGetNearybySpot = ({ queryType, position, spotId }) => {
    const [status, setStatus] = useState(undefined);
    const [data, setData] = useState(undefined);
    const [pagination, setPagination] = useState(undefined);
    const [error, setError] = useState(undefined);

    const isMountedRef = useRef(true);
    const apiControllerRef = useRef();
    // console.log('apiControllerRef', apiControllerRef);

    // useEffect(() => {
    //   isMountedRef.current = true;

    //   return () => {
    //     isMountedRef.current = false;
    //     apiControllerRef.current?.abort();
    //     console.clear(); //FIXME:
    //   };
    // }, []);

    /**
     * Hook
     * 名稱: 取得所有觀光活動資料
     */
    useEffect(() => {
        const handleData = async () => {
            let accessToken = await getAuthorizationHeader();
            let responseData;

            switch (queryType) {
                // --------------------------------------------------------
                // call API 取得附近觀光景點資料
                case 'scenicSpot':
                    responseData = await getScenicSpotAPI({
                        // signal: apiControllerRef.current.signal,
                        top: 10,
                        spatialFilter: `nearby(${position.PositionLat},${position.PositionLon},20000)`,
                        select: 'ScenicSpotID,ScenicSpotName,Picture,Address,City,OpenTime',
                        filter: `Picture/PictureUrl1 ne null and ScenicSpotID ne '${spotId}'`,
                        accessToken,
                    });
                    break;

                // --------------------------------------------------------
                // call API 取得附近觀光餐飲資料
                case 'restaurant':
                    responseData = await getRestaurantAPI({
                        // signal: apiControllerRef.current.signal,
                        top: 10,
                        spatialFilter: `nearby(${position.PositionLat},${position.PositionLon},20000)`,
                        select: 'RestaurantID,RestaurantName,Picture,Address,OpenTime',
                        filter: `Picture/PictureUrl1 ne null and RestaurantID ne '${spotId}'`,
                        accessToken,
                    });
                    break;
                // --------------------------------------------------------
                // call API 取得附近觀光活動資料
                case 'activity':
                    const time = moment(new Date(), 'Asia/Taipei').format(
                        'YYYY-MM-DD'
                    );
                    responseData = await getActivityAPI({
                        // signal: apiControllerRef.current.signal,
                        top: 10,
                        spatialFilter: `nearby(${position.PositionLat},${position.PositionLon},20000)`,
                        select: 'ActivityID,ActivityName,Picture,Address,City,StartTime,EndTime',
                        filter: `Picture/PictureUrl1 ne null and ActivityID ne '${spotId}'`,
                        accessToken,
                    });
                    break;

                default:
                    break;
            }

            // 確保在此頁執行
            // if (isMountedRef.current) {
            if (responseData?.status === 'success') {
                // handle success (取得觀光活動資料)
                setData(responseData?.data);
                setStatus('success');
            } else if (responseData?.status === 'error') {
                // handle error (後端錯誤)
                setStatus('error');
                setError(responseData.desc);
            } else {
                // handle cancel (取消 call api)
                setStatus('cancel');
            }
            // }
        };
        handleData();
    }, [queryType, position]);

    return {
        status: status,
        data: data,
        // pagination: pagination,
        error: error,
    };
};

export default useGetNearybySpot;
