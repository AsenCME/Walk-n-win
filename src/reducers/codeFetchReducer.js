import { 
    FETCH_CODES_START,
    FETCH_CODE_SUCCESS,
    FETCH_CODE_ERROR,
    LAST_FETCH,
    SELECT_COMPANY
} from '../actions/actionTypes';

const defaultState = {
    isFetching: false,
    codes: [],
    error: null,
    lastFetch: null,
    selected: null
}

export default function codeFetchingReducer(state = defaultState, action) {
    switch(action.type) {
        case FETCH_CODES_START: {
            return {
                ...state,
                isFetching: true
            }
        }
        case FETCH_CODE_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                codes: action.codes
            }
        }
        case FETCH_CODE_ERROR: {
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        }
        case LAST_FETCH: {
            return {
                ...state,
                lastFetch: action.lastFetch
            }
        }
        case SELECT_COMPANY: {
            return {
                ...state,
                selected: action.index
            }
        }
        default: return state;
    }
}