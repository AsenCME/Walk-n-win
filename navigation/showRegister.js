import { Navigation } from 'react-native-navigation';

export function showRegister() {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'steps.register'
                        }
                    }
                ],
                options: {
                    topBar: {
                        visible: false,
                        drawBehind: true
                    }
                }
            }
        }
    });
}