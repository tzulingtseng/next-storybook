import moment from 'moment-timezone';

export function dateTransfer(time) {
    return moment(time)
        .tz('Asia/Taipei')
        .format('YYYY-MM-DD')
}