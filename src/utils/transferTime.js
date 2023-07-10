import moment from 'moment-timezone';
const transferTime = (openTimeParam, startTimeParam, endTimeParam) => {
    // console.log('startTimeParam', startTimeParam);
    let formattedTime = '';
    let isAllDay = openTimeParam === '全天候開放';
    if (isAllDay) {
        // formattedTime = t('carouselConfig.allDay');
        formattedTime = 'allDay';
    } else if (startTimeParam !== undefined) {
        const startTime = moment(startTimeParam, moment.ISO_8601)
            .tz('Asia/Taipei')
            .format('YYYY-MM-DD');
        const endTime = moment(endTimeParam, moment.ISO_8601)
            .tz('Asia/Taipei')
            .format('YYYY-MM-DD');
        formattedTime = `${startTime} ~ ${endTime}`;
    } else {
        // formattedTime = t('carouselConfig.moreDetails');
        formattedTime = 'moreDetails';
    }
    return formattedTime;
};
export default transferTime;
