import { DeviceEventEmitter } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../src/reducers/rootReducer';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store, null, function() {
    DeviceEventEmitter.emit('redux-persisted');
});

export { store, persistor };