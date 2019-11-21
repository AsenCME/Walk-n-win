import moment from 'moment';

class DateUtil {

    /**
     * 
     * @param {number} number Time unit in UNIX
     * @returns {moment.Moment} Momentjs Date Object
     */
    static unixToMoment(number) {
        if(!isNaN(number))
            return moment.unix(parseInt(number));
        else return moment(number);
    }    

    static unixTimeStamp() {
        return Math.floor(Date.now() / 1000);
    }
}

export default DateUtil;