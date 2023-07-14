import moment from 'moment-timezone';
const transferTime = (openTimeParam, startTimeParam, endTimeParam) => {
    // let isAllDay = openTimeParam === '全天候開放';
    if (openTimeParam) {
        return openTimeParam;
    } else if (startTimeParam) {
        const startTime = moment(startTimeParam, moment.ISO_8601)
            .tz('Asia/Taipei')
            .format('YYYY-MM-DD');
        const endTime = moment(endTimeParam, moment.ISO_8601)
            .tz('Asia/Taipei')
            .format('YYYY-MM-DD');
        if (startTime === endTime) {
            return startTime;
        } else {
            return `${startTime} ~ ${endTime}`;
        }
    } else {
        return 'moreDetails';
    }
};
export default transferTime;
