import Firebase from 'react-native-firebase';

const app = Firebase.app();
const auth = app.auth();
const firestore = app.firestore();

firestore.settings({
    timestampsInSnapshots: true
});

export default app;
export { auth };
export { firestore };