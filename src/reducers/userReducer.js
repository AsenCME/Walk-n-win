import { 
    SAVE_USER,
    LOGOUT,
    SET_LAST_SYNC,
    SET_LAST_ENTER
} from '../actions/actionTypes';
import defaultUser from '../../constants/defaultUser';

const defaultState = {
    ...defaultUser,
    lastSync: null,
    lastEnter: null
}

function userReducer (state = defaultState, action) {
    switch(action.type) {
        case SAVE_USER: {
            return {
                ...state,
                ...action.paylord
            }
        }
        case LOGOUT: {
            return defaultState;
        }
        case SET_LAST_SYNC: {
            return {
                ...state,
                lastSync: action.date
            }
        }
        case SET_LAST_ENTER: {
            return {
                ...state,
                lastEnter: action.date
            }
        }
        default: return state;
    }
}

export default userReducer;