import React from 'react';
import {Provider} from 'mobx-react';
import ThemeStore from './src/store/ThemeStore';
import App from './App';
const MainApp = () => {
  return (
    <Provider themeStore={ThemeStore}>
      <App />
    </Provider>
  );
};
export default MainApp;
