import moment from 'moment';

export function utcToLocal(date) {
    const local = moment.utc(date).local();
    let year = local.year();
    let month = local.month() + 1;
    let day = local.date();
    let hour = local.hour();
    let minute = local.minute();
    let second = local.second();
    return {
        datePart: `${year}-${month}-${day}`,
        timePart: `${hour}:${minute}:${second}`,
        year,
        month,
        day,
        hour,
        minute,
        second
    }
}
