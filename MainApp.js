import React from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/store/store';
import App from './App';
import {PersistGate} from 'redux-persist/integration/react';

const MainApp = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
    </Provider>
  );
};
export default MainApp;
