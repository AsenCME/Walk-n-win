import { Alert } from 'react-native';
import { auth, firestore } from '../../firebase';
import { showLoading, hideLoading } from '../../navigation/index';
import User from '../includes/User';
import Points from '../../constants/points';
import { resetData } from './activityActions';

export const SAVE_USER = 'SAVE_USER';
export const LOGOUT    = 'LOGOUT';
export const SET_LAST_SYNC  = 'SET_LAST_SYNC';
export const SET_LAST_ENTER = 'SET_LAST_ENTER';

/**
 * The function creates an account and new documnet in the users collection.
 * The Redux store is updated aswell. The function does not throw errors. They are supposed
 * to be processed outside the function
 * @param {string} email
 * @param {string} password 
 * @param {string} username 
 * @returns {Promise}
 */
export function createUserWithEmail(email, password, username) {
    return dispatch => {
        // Show loading screen
        showLoading();
        return auth.createUserWithEmailAndPassword(email,password)
        .then(async user => {
            const uid = user.user.uid;
            try {
                const newUser = User.createUser(username);

                await firestore.collection('users').doc(uid).set(newUser);

                // Hide loading sreen
                hideLoading();

                return dispatch(saveUser(newUser));
                
            } catch(err) {

                await User.deleteCurrentUser();
                
                // Hide loading screen
                hideLoading();
                return new Error(err.message);
            }
            
        })
        .catch(err => {
            let message = '';
            if(err.code === 'auth/email-already-in-use') {
                message = 'Имейл адресът е зает';
            }
            else if(err.code === 'auth/invalid-email') {
                message = 'Невалиден имейл адрес';
            }
            else {
                message = 'Грешка';
            }
            console.log('An error occured during account creation. Possible firestore db error', err)

            // Hide loading screen
            hideLoading();
            return new Error(message);
        });
    }
}

/**
 * Sign out of current account and remove data from Redux store
 * @returns {Promise}
 */
export function userLogout() {
    return async dispatch => {
        try {
            await User.sync();
        } catch(err) {
            console.log(err);
        }
        dispatch(logoutUser());
        dispatch(resetData());

        return auth.signOut();
    }
}

/**
 * Sign in user with the given credentials and save data to Redux. The function returnes Error or UserData.
 * The errors are supposed to be processed outside the function
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise}
 */
export function loginUser(email, password) {
    return dispatch => {
        showLoading();
        return auth.signInWithEmailAndPassword(email, password)
        .then(async user => {
            const uid = user.user.uid;

            try {
                const data = await firestore.collection('users').doc(uid).get();

                console.log("User Logged In", data.data());
                
                dispatch(saveUser(data.data()));
                
                hideLoading();

                return data.data();
                
            } catch(err) {
                console.log("Error on login after fetching firebase data", err);
                hideLoading();
                return new Error(err.message);
            }
        })
        .catch(err => {
            let message = '';
            if(err.code === 'auth/wrong-password') {
                message = 'Паролата не съвпада';
            } else if(err.code === 'auth/user-not-found') {
                message = 'Несъществуващ потребител';
            }
            else message = 'Възникна грешка';
            hideLoading();
            return new Error(message);
        });
    }
}

function lastLVLPoints(cost, credits) {
    let sum = 0;
    for(let i = 0; i < cost; i++) {
        if( credits - 1 >= 0 ) {
            let pointsCurrentLvl = Points[ credits - 1 - i ] - Points[ credits - 2 - i ];
            sum += pointsCurrentLvl;
        }
        else break;
    }

    return sum;
}

function getCreditsByPoints(totalPoints) {
	if (Points[0] > totalPoints) return 0;

	let lvl = 0;

	for (let i = 0; i < Points.length; i++) {
		if (Points[i] > totalPoints) {
			lvl = i;
			break;
		}
	}

	return lvl;
}

export function buyProduct(price) {
    return async (dispatch, getState) => {
        const credits = getState().user.credits;
        if(price > credits) {
            Alert.alert('Грешка', 'Нямате достатъчно кредити');   
            throw new Error('Not enough');
        }
        const totalPoints = getState().user.totalPoints;

        let newTotalPoints = totalPoints - Points[credits - 1];
        
        let newCredits = getCreditsByPoints(newTotalPoints);

        dispatch(saveUser({
            totalPoints: newTotalPoints,
            credits: newCredits
        }));
    }
}

export function saveUser(data) {
    return {
        type: SAVE_USER,
        paylord: data
    }
}

export function logoutUser() {
    return {
        type: LOGOUT
    }
}

export function setLastSync(date) {
    return {
        type: SET_LAST_SYNC,
        date
    }
}

export function setLastEnter(date) {
    return {
        type: SET_LAST_ENTER,
        date
    }
}