import GFit from 'react-native-google-fit';
import { Alert } from 'react-native';
import Pedometer from 'react-native-universal-pedometer';
import moment from 'moment';
import { store } from '../../store/createStore';
import { setData } from '../actions/activityActions';
import DateUtil from './DateUtil';

const GoogleFitDateObj = {
    startDate: null,
    endDate: null
}

class GoogleFit {
    static authenticate(onSuccess, onError) {
        GFit.authorize();
        if(onSuccess) {
            GFit.onAuthorize(onSuccess);
        }

        if(onError) {
            GFit.onAuthorizeFailure(onError);
        }
    }

    static isAuthenticated() {
        return new Promise((resolve, reject) => {
            GFit.isEnabled(function(isErr, result) {
                if(isErr) return reject();
                if(result === false) {
                    return resolve(false);
                } else return resolve(true);
            });
        });
    }

    /**
     * Attach event listener to OnAuthorization event
     * @param {Function} callback Callback fired when user accept authorization
     */
    static onAuthorization(callback) {
        GFit.onAuthorize(callback);
    }

    static onAuthorizationFail(callback) {
        GFit.onAuthorizeFailure(callback);
    }


    /**
     * @typedef StepDataSample
     * @property {string} date
     * @property {number} value
     */
    /**
     * @param {GoogleFitDateObj} options Object containing startDate and endDate properties in ISOString Date format
     * @returns {Array<StepDataSample>| j} Return either the total steps for the given perion
     * @throws {Error}
     */
    static getStepsFromDate(options) { 
        return new Promise((res, rej) => {
            GFit.getDailyStepCountSamples(options, function(err, result) {
                if(err) return rej(new Error('Неуспешно извличане на данни от Google Fitnesss'));
                if(result.length >= 2) {
                    return res(result[1].steps);
                } else if(result.length >= 1) {
                    return res(result[0].steps);
                }
            });
        });
    }

    /**
     * 
     * @param {Object} options Object containing startDate and endDate properties in ISOString Date format
     * @returns {Array<Object>|false} Return either the total calories for the given period
     * @throws {Error}
     */
    static getCaloriesFromDate(options) {
        return new Promise((res, rej) => {
            GFit.getDailyCalorieSamples(options, function(isErr, result) {
                if(isErr) {
                    return rej(new Error('Cannot fetch data from Google Fit - Calories'));   
                }
                return res(result)
            });
        });
    }

    /**
     * 
     * @param {Object} options Object containing properties startDate and endDate ISOString Date
     * @returns {Promise<Array|Error>} 
     * @throws {Error}
     */
    static getDistanceFromDate(options) {
        return new Promise((res, rej) => {
            GFit.getDailyDistanceSamples(options, function(isErr, result) {
                if(isErr == 'There is no any distance data for this period') return res([]);
                if(isErr) return rej(new Error('Неуспешно извличане на данни от Google Fitness'));
                return res(result);
            });
        });
    }

    /**
     * 
     * @param {Function} callback 
     */
    static startPedometerListener(callback) {
        Pedometer.startPedometerUpdatesFromDate(Date.now(), callback);
    }

    static stopPedometerListener() {
        Pedometer.stopPedometerUpdates();
    }

    /**
     * Fetch Data from Google Fit for Single Day
     * @param {moment.Moment} startDate - The data object from startdate
     * @param {Bool} sinceMidnight - Whether to fetch the data since midnight
     * @param {moment.Moment} endDate - The end date
     */
    static async fetchDataSingle(startDate, sinceMidnight = false, endDate) {
        if(sinceMidnight) {
            startDate.startOf('day');
        }
        const options = {
            startDate: startDate.toISOString(),
            endDate: endDate ? endDate.toISOString() : moment().toISOString()
        };

        try {
            const data = await Promise.all([
                GoogleFit.getStepsFromDate(options),
                GoogleFit.getDistanceFromDate(options),
                GoogleFit.getCaloriesFromDate(options)
            ]);;

            const response = {
                steps: data[0].length ? data[0][0].value : 0,
                distance: data[1].length ? data[1][0].distance : 0,
                calories: data[2].length ? data[2][0].calorie : 0
            }

            if(response.distance === 0) {
                response.distance = response.steps * 0.66;
            }

            return response;

        } catch(err) {
            return new Error(err.message);
        }
    }

    static async sync() {
        const state = store.getState();
        const createdAt = DateUtil.unixToMoment(state.user.createdAt);
        
        const startDate = createdAt.isSame(moment(), 'date') ? createdAt : moment().startOf('day');
    
        try {
            const { steps, distance, calories } = await GoogleFit.fetchDataSingle(startDate, false); 

            store.dispatch(setData(steps, distance, calories));
            
        } catch(err) {
            Alert.alert('Грешка', 'Синхронизирането на данните с Google Fit беше неуспешно');
        }
        
    }

    static magic() {
        GFit.observeSteps(function() {
            console.log(arguments);
        });

        GFit.observeHistory(function() {
            console.log(arguments);
        })
    }


}
export default GoogleFit;