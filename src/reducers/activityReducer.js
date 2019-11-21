import { 
    SET_LAST_SYNC_DATA,
    SET_CALORIES, 
    SET_DATA, 
    SET_DISTANCE, 
    SET_STEPS, 
    ADD_STEP, 
    START_LISTENER, 
    PEDOMETER_UPDATE,
    RESET_DATA
} from '../actions/actionTypes';    

const defaultState = {
    steps: 0,
    distance: 0,
    calories: 0,
    isListening: false,
    pivotSteps: 0,
    lastSync: null
};

function activityReducer(state = defaultState, action) {
    switch(action.type) {
        case SET_LAST_SYNC_DATA: {
            return {
                ...state,
                lastSync: action.time
            }
        }
        case START_LISTENER: {
            return {
                ...state,
                isListening: true,
                pivotSteps: (state.steps | 0) 
            }
        }
        case PEDOMETER_UPDATE: {
            return {
                ...state,
                steps: (state.pivotSteps | 0) + action.steps
            }
        }
        case SET_DATA: {
            return {
                ...state,
                steps: action.steps | 0,
                distance: action.distance | 0,
                calories: action.calories | 0
            }
        }
        case RESET_DATA: {
            return defaultState;
        }
        case SET_STEPS: {
            return {
                ...state,
                steps: state.pivotSteps + action.steps
            }
        }
        case SET_DISTANCE: {
            return {
                ...state,
                distance: action.distance
            }
        }
        case SET_CALORIES: {
            return {
                ...state,
                calories: action.calories
            }
        }
        case ADD_STEP: {
            return {
                ...state,
                steps: state.steps + 1
            }
        }
        default: return state;
    }
}

export default activityReducer;