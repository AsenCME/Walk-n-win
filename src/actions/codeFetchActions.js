import moment from 'moment';
import { firestore } from '../../firebase';

export const FETCH_CODES_START = 'FETCH_CODES_START'; 
export const FETCH_CODE_SUCCESS = 'FETCH_CODE_SUCCESS';
export const FETCH_CODE_ERROR = 'FETCH_CODE_ERROR';
export const LAST_FETCH = 'LAST_FETCH';
export const SELECT_COMPANY = 'SELECT_COMPANY';

export function fetchCodes() {
    return async (dispatch, getState) => {
        dispatch(startCodeFetching());
        const state = getState();
        const lastFetch = state.codes.lastFetch;

        // if user has requested code fetch in the past one hour
        if(lastFetch && moment.unix(lastFetch).isAfter(moment().subtract(1, 'hour')) ) {
            dispatch(codeFetchingSuccess(state.codes.codes));
            return;
        }        

        try {
            const result = [];
            const companies = await firestore.collection('companies').limit(5).get();
            const promiseArr = [];

            companies.forEach(company => {
                const data = company.data();

                result.push({
                    storeName: data.name,
                    logoImage: data.logoUrl,
                    backgroundImage: data.backgroundUrl,
                    codes: []
                });

                promiseArr.push(
                    firestore.collection('companies').doc(company.id).collection('codes').get()
                );
            });

            const companyCodes = await Promise.all(promiseArr);

            companyCodes.forEach((item, i) => {

                if(!item.empty) {
                    item.docs.forEach(code => {
                        code = code.data();
                       const codeObj = {
                           name: code.name,
                           description: code.description,
                           inStock: code.currentStock,
                           discount: code.discount,
                           price: code.price,
                           codeVariations: code.codes
                       }
                       
                       result[i].codes.push(codeObj);
                    });
                }

            });

            dispatch(codeFetchingSuccess(result));
            dispatch(codeLastFetch(Math.floor(Date.now() / 1000)));
        }
        catch (error) {
            dispatch(codeFetchingError(error.message));
        }

    }
}

function startCodeFetching() {
    return {
        type: FETCH_CODES_START
    }
}

function codeFetchingSuccess(codes) {
    return {
        type: FETCH_CODE_SUCCESS,
        codes
    }
}

function codeFetchingError(error) {
    return {
        type: FETCH_CODE_ERROR,
        error
    }
}

function codeLastFetch(lastFetch) {
    return {
        type: LAST_FETCH,
        lastFetch
    }
}

export function selectCompany(index) {
    return {
        type: SELECT_COMPANY,
        index
    }
}