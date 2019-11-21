import { combineReducers } from 'redux';
import userReducer from './userReducer';
import activityReducer from './activityReducer';
import codeFetchingReducer from './codeFetchReducer';

const rootReducer = combineReducers({
    user: userReducer,
    activities: activityReducer,
    codes: codeFetchingReducer 
});

export default rootReducer;