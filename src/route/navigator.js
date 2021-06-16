import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './main';
import AuthNavigator from './auth';
import {useSelector} from 'react-redux';

const AppNavigator = () => {
  const {isLoggedIn} = useSelector((state) => state.app_store);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
