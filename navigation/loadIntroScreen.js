import { Navigation } from 'react-native-navigation';

export function loadIntroScreen() {
    Navigation.setRoot({
        root: {
            component: {
                name: 'steps.intro'
            }
        }
    });
}
