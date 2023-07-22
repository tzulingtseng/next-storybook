import moment from 'moment-timezone';

const mapOpenTime = {
    '全天候開放': 'allDay',
    '全天': 'allDay',
    '全天候': 'allDay',
    '全年無休': 'allDay',
    '全日開放': 'allDay',
    '全年開放': 'allDay',
    '24h': 'allDay',
    '24H': 'allDay',
    '24小時': 'allDay',
};

const formatTime = (time) => {
    return moment(time, moment.ISO_8601)
        .tz('Asia/Taipei')
        .format('YYYY-MM-DD');
}

const formatTimeRange = (startTime, endTime) => {
    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);
    return formattedStartTime === formattedEndTime
        ? formattedEndTime
        : `${formattedStartTime} ~ ${formattedEndTime}`;
};

const transferTime = (openTimeParam, startTimeParam, endTimeParam) => {
    if (openTimeParam) {
        const mappedTime = mapOpenTime[openTimeParam];
        return mappedTime || openTimeParam;
    } else if (startTimeParam && endTimeParam) {
        return formatTimeRange(startTimeParam, endTimeParam);
    } else {
        return 'moreDetails';
    }
};

export default transferTime;
