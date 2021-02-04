/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {mapping, dark, light} from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {default as customLightTheme} from './src/config/light-theme.json';
import {default as customDarkTheme} from './src/config/dark-theme.json';
import {default as customMapping} from './src/config/custom-mapping.json';
import {inject, observer} from 'mobx-react';
import AppNavigator from './src/route/navigator';

const darkTheme = {...dark, ...customDarkTheme};
const lightTheme = {...light, ...customLightTheme};

const App = (props) => {
  const {myTheme} = props.store;
  /* const [theme, setTheme] = useState('');
  const getTheme = async () => {
    try {
      const mytheme = await AsyncStorage.getItem('theme');
      setTheme(mytheme);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTheme();
  }); */
  let currentTheme = lightTheme;
  if (myTheme === 'lightTheme') {
    currentTheme = lightTheme;
  } else if (myTheme === 'darkTheme') {
    currentTheme = darkTheme;
  }
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        mapping={mapping}
        theme={currentTheme}
        customMapping={customMapping}>
        <StatusBar backgroundColor="#00AB4A" />
        <AppNavigator />
      </ApplicationProvider>
    </>
  );
};

export default inject('store')(observer(App));
