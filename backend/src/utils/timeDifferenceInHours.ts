import moment from 'moment-timezone';

export const timeDifferenceInHours = async (time: Date) => {
    const currentISTTime = moment().tz("Asia/Kolkata");

    const difference = moment.duration(moment(time).diff(currentISTTime)).asHours();

    return difference
};