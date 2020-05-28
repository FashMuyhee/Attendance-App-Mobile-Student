import React from 'react';
import {Provider} from 'mobx-react';
import Store from './src/store/Store';
import App from './App';
const MainApp = () => {
  return (
    <Provider store={Store}>
      <App />
    </Provider>
  );
};
export default MainApp;
