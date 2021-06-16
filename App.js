/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {mapping, dark, light} from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {default as customLightTheme} from './src/config/light-theme.json';
import {default as customDarkTheme} from './src/config/dark-theme.json';
import {default as customMapping} from './src/config/custom-mapping.json';
import AppNavigator from './src/route/navigator';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
const darkTheme = {...dark, ...customDarkTheme};
const lightTheme = {...light, ...customLightTheme};
import {useSelector} from 'react-redux';
import axios from 'axios';

const App = () => {
  const {isDark, userToken} = useSelector((state) => state.app_store);

  useEffect(() => {
    changeNavigationBarColor('#00AB4A', false, true);
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
  }, []);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        mapping={mapping}
        theme={isDark ? darkTheme : lightTheme}
        customMapping={customMapping}>
        <StatusBar backgroundColor="#00AB4A" />
        <AppNavigator />
      </ApplicationProvider>
    </>
  );
};

export default App;
