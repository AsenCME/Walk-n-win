import defaultUser from '../../constants/defaultUser';
import { auth, firestore } from '../../firebase';
import { store } from '../../store/createStore';
import DateUtil from './DateUtil';

class User {
    static createUser(username) {
        const newUser = Object.assign({}, defaultUser);
        newUser.createdAt = DateUtil.unixTimeStamp();
        if(username)
            newUser.username = username;
            
        return newUser;
    }

    static async deleteCurrentUser() {
        if(!auth.currentUser || !auth.currentUser.uid) return;

        const uid = auth.currentUser.uid;
        await auth.currentUser.delete();
        await firestore.collection('users').doc(uid).delete();
        return true;
    }

    static getUID() {
        if(auth.currentUser && auth.currentUser.uid)
            return auth.currentUser.uid;
        else return null;
    }

    static async sync() {
        const state = store.getState();
        try {
            await firestore.collection('users').doc(User.getUID()).update({
                credits: state.user.credits,
                totalPoints: state.user.totalPoints,
                today: {
                    steps: state.activities.steps,
                    calories: state.activities.calories,
                    distance: state.activities.distance
                },
                lastSync: state.user.lastSync
            });
        } catch(err) {
            console.log('Firebase Syncing Failed');
        }
    }
}

export default User;