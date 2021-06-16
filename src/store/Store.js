import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import AppReducer from './reducer';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: null,
};

const rootReducer = combineReducers({app_store: AppReducer});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

let store = createStore(
  persistedReducer,
  initialState,
  applyMiddleware(...middleware),
);

let persistor = persistStore(store);
export {store, persistor};
