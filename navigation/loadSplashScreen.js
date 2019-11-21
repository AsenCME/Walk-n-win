import { DeviceEventEmitter } from 'react-native';
import { Navigation } from 'react-native-navigation';
import LoadingScreen from '../screens/Init/LoadingScreen';

export function loadSplash() {
    DeviceEventEmitter.addListener('my-custom-event', function() {
        console.log('The Props');
    })
    Navigation.registerComponent('steps.splash', () => LoadingScreen);

    Navigation.setRoot({
        root: {
            component: {
                name: 'steps.splash'
            }
        }
    });
}