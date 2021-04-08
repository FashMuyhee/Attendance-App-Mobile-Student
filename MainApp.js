import React from 'react';
import {Provider} from 'mobx-react';
import Store from './src/store/Store';
import App from './App';
import {ThemeProvider} from './src/store/ThemeContext';
const MainApp = () => {
  return (
    <ThemeProvider>
      <Provider store={Store}>
        <App />
      </Provider>
    </ThemeProvider>
  );
};
export default MainApp;
