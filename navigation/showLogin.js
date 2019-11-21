import { Navigation } from 'react-native-navigation';

export function showLogin(componentId) {
    // Navigation.showModal({
    //     component: {
    //         name: 'steps.login'
    //     }
    // });
    Navigation.push(componentId, {
        component: {
            name: 'steps.login'
        }
    });
}