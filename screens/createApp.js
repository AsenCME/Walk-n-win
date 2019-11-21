import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/createStore';

export default function createApp(Component) {
    return () => {
      return class StoreWrapper extends React.Component {
          render () {
              return (
                  <Provider store={store}>
                    <PersistGate
                      loading={null}
                      persistor={persistor}
                    >
                      <Component {...this.props} />
                    </PersistGate>
                  </Provider>
              );
          }
      };
    };
}