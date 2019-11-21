import moment from 'moment';
import { 
	AppState, 
	DeviceEventEmitter, 
	ToastAndroid 
} from 'react-native';
import GoogleFit from './src/includes/GoogleFit';
import Points from './constants/points';
import { saveUser, setLastEnter, setLastSync } from './src/actions/userActions';
import { setData, startListener, setPivot, pedometerUpdate, lastSync as lastSyncActivities } from './src/actions/activityActions';
import { store } from './store/createStore';
import DateUtil from './src/includes/DateUtil';
import User from './src/includes/User';

export function onAppLaunch() {
    return new Promise( async (resolve, reject) => {
		
		// Ensure redux-persisted event is called, even if store is persisted
		if(store.getState()._persist.rehydrated) {
			setTimeout(() => {
				DeviceEventEmitter.emit('redux-persisted');
			}, 2);
		}

		DeviceEventEmitter.once('redux-persisted', async () => {
			const isEnabled = await GoogleFit.isAuthenticated();
			console.log({ isEnabled });
			if(isEnabled) {
				onStartUp()
				.then(() => {
					console.log("data loaded");
					resolve();
				})
				.catch(() => {
					console.log("error loading");
					reject();
				});
			} else {
				console.log('ask for ath');
				GoogleFit.authenticate(() => { //onSuccess
					console.log('authenticated');
					onStartUp()
						.then(() => {
							console.log("data loaded");
							resolve();
						})
						.catch(() => {
							console.log("error loading");
							reject();
						});
				}, () => { // onError
					console.log('fail Authenrication');
					ToastAndroid.showWithGravity(
						'Неуспешно свързане с Google Fit. Затворете приложението и опитайте отново',
						ToastAndroid.SHORT,
						ToastAndroid.BOTTOM);
					onStartUp()
						.then(() => {
							console.log("data loaded");
							resolve();
						})
						.catch(() => {
							console.log("error loading");
							reject();
						});
				});
			}
		});
    });
}


async function onStartUp() {
	const state = store.getState();
	
    if(state.user.lastSync) {
		console.log('user is not fresh');
		
		const lastSync = DateUtil.unixToMoment(state.user.lastSync);

        try {
			await convertStepsToPoints(lastSync, state);
			await getDailyData(state);
			User.sync();

        } catch(err) {
			ToastAndroid.showWithGravity(err.message, ToastAndroid.LONG, ToastAndroid.BOTTOM);
        }

    } else {
        console.log('Fresh user');
		initializeReduxState();
    }

    startPedometerListener();
	startAppStateListener();
	
    setTimeout(() => {
        syncData();
    }, 600000);
}

/**
 *
 * @param {moment.Moment} lastSync
 * @param {Object} state
 */
async function convertStepsToPoints(lastSync, state) {
	const options = {
		startDate: lastSync.toISOString(),
		endDate: moment().toISOString(),
	};

	try {
		const data = await GoogleFit.getStepsFromDate(options);

		// Total Steps since last sync
		const totalSteps = data.reduce((total, currentVal) => total + currentVal.value, 0);
		const pointsFromState = Number.isInteger(state.user.totalPoints)
			? parseInt(state.user.totalPoints)
			: 0;

		const creditsFromState = state.user.credits;

		const updatedPoints = totalSteps + pointsFromState;
		const newCredits = getCreditsByPoints(updatedPoints);

		if (newCredits != creditsFromState) {
			// Yay you aquired new credit
		}

		console.log("Converting points", { updatedPoints, newCredits, totalSteps, lastSync, pointsFromState });
		store.dispatch(
			saveUser({
				totalPoints: updatedPoints,
				credits: newCredits,
			}),
		);

		store.dispatch(setLastSync(DateUtil.unixTimeStamp()));
	} catch (err) {
		ToastAndroid.showWithGravity(err.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
		console.log("An Error has occured on converting steps to points", err);
	}
}

/**
 *
 * @param {Object} state
 */
async function getDailyData(state) {
	const createdAt = DateUtil.unixToMoment(state.user.createdAt);
	const startDate = createdAt.isSame(moment(), "day") ? createdAt : moment().startOf("day");
	const lastSync = state.activities.lastSync ? DateUtil.unixToMoment( state.activities.lastSync ) : false;
	console.log(createdAt, startDate, lastSync);
	if(lastSync && lastSync.isAfter(moment().subtract(1, 'hour')) ) return;

	try {
		const { steps, distance, calories } = await GoogleFit.fetchDataSingle(startDate, false);
		
		console.log({ steps, distance, calories });

		store.dispatch(setData(steps, distance, calories));
		store.dispatch(lastSyncActivities( moment().unix() ));
	} catch (err) {
		ToastAndroid.showWithGravity(err.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
	}
}

function initializeReduxState() {
	const timeStamp = DateUtil.unixTimeStamp();

	store.dispatch(
		saveUser({
			lastSync: timeStamp,
		}),
	);

	store.dispatch(setData(0, 0, 0));

	console.log("New User Initialized");
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

function startAppStateListener() {
	AppState.addEventListener("change", function(state) {
		if (state === "background" || state === "active") {
			store.dispatch(setLastEnter(DateUtil.unixTimeStamp()));
		}
	});
}

function startPedometerListener() {
	store.dispatch(setPivot());
	store.dispatch(startListener());
	store.dispatch(saveUser({
		pivotTotalPoints: store.getState().user.totalPoints
	}));

	GoogleFit.startPedometerListener(function(data) {
		console.log(data);
		const steps = data.numberOfSteps;
		store.dispatch(pedometerUpdate(steps));
		const state = store.getState();
		const newTotalPoints = state.user.pivotTotalPoints + steps; 
		const newCredits = getCreditsByPoints(newTotalPoints);

		store.dispatch(saveUser({
			totalPoints: newTotalPoints,
			credits: newCredits
		}));
	});
}

function syncData() {
	User.sync();
	GoogleFit.sync();
}

