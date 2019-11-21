import { Navigation } from 'react-native-navigation';

export const showLoading = () => {
    Navigation.showOverlay({
        component: {
            id: 'loading-component',
            name: 'steps.loading'
        }
    });
}

/**
 * 
 * @param {String} componentId
 */
export const hideLoading = () => {
    Navigation.dismissOverlay('loading-component');
}