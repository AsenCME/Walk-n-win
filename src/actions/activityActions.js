export const SET_STEPS = 'SET_STEPS';
export const ADD_STEP = 'ADD_STEP';
export const SET_DISTANCE = 'SET_DISTANCE';
export const SET_CALORIES = 'SET_CALORIES';
export const SET_DATA = 'SET_DATA';
export const START_LISTENER = 'START_LISTENER';
export const STOP_LISTENER = 'STOP_LISTENER';
export const PEDOMETER_UPDATE = 'PEDOMETER_UPDATE';
export const SET_PIVOT = 'SET_PIVOT';
export const RESET_DATA = 'RESET_DATA';
export const SET_LAST_SYNC_DATA = 'SET_LAST_SYNC_DATA';

export function lastSync(time) {
    return {
        type: SET_LAST_SYNC_DATA,
        time
    }
}

export function addStepAndCalculate() {
    return async (dispatch, getState) => {
        const state = getState();
        const user = state.user;
        let height = user.body.height || 170;
        let weight = user.body.weight || 65;
        let gender = user.body.gender || 1;

        const { calories, distance, steps } = calculateData(state.activities.steps, height, gender);

        return dispatch(addData(steps, distance, calories));
    }
}

export function setData(steps, distance, calories) {
    return {
        type: SET_DATA,
        steps,
        distance,
        calories
    }
}

export function setStepsAndCalculate(steps) {
    return dispatch => {
        let height = 170;
        let weight = 65;
        
        const stepLength = (height / 100.0) * 0.414;

        const newSteps = steps;
        const distance = Math.round(stepLength * newSteps / 1000);
        const calories = Math.round(newSteps / 20.0);

        return dispatch(addData(newSteps, distance, calories));
    }
}

export function setPivot() {
    return {
        type: SET_PIVOT
    }
}

export function setSteps(steps) {
    return {
        type: SET_STEPS,
        steps
    }
}

export function setDistance(distance) {
    return {
        type: SET_DISTANCE,
        distance
    }
}

export function setCalories(calories) {
    return {
        type: SET_CALORIES,
        calories
    }
}

export function addStep() {
    return {
        type: ADD_STEP
    }
}

export function startListener() {
    return {
        type: START_LISTENER
    }
}

export function pedometerUpdate(steps) {
    return {
        type: PEDOMETER_UPDATE,
        steps
    }
}

export function resetData() {
    return {
        type: RESET_DATA
    }
}