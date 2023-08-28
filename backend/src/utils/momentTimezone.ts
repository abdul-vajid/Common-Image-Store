import moment from 'moment-timezone';

export const timeDifferenceInHours = async (time: Date) => {
    const currentISTTime = moment().tz("Asia/Kolkata");

    const difference = moment.duration(moment(time).diff(currentISTTime)).asHours();

    return difference
};

export const currentISTTime = (): Date => {
    const currentTimeMoment = moment().tz('Asia/Kolkata');
    const currentTimeDate = currentTimeMoment.toDate();

    return currentTimeDate
}

export const getNext30thDayAt1159PM = (): Date => {
    const currentTimeMoment = moment().tz('Asia/Kolkata');
    const currentDate = currentTimeMoment.date();
    
    const next30thDay = currentDate <= 30 ? 30 : 1;
    const nextMonth = next30thDay === 30 ? currentTimeMoment.month() : currentTimeMoment.month() + 1;
    const nextYear = nextMonth === 0 ? currentTimeMoment.year() + 1 : currentTimeMoment.year();
    
    const next30thDayAt1159PM = moment.tz([nextYear, nextMonth, next30thDay, 23, 59], 'Asia/Kolkata');
    
    return next30thDayAt1159PM.toDate();
}