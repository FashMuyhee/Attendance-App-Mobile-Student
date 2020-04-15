import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  HomeScreen,
  SettingsScreen,
  LandingScreen,
  SignUpScreen,
  SignInScreen,
  TakeScreen,
} from '../views';

const Stack = createStackNavigator();
/* const MainNavigator = () => (
  <Stack.Navigator headerMode="none">

  </Stack.Navigator>
); */

const OnboardingNavigator = () => (
  <Stack.Navigator headerMode="none" initialRouteName="home">
    <Stack.Screen name="landing" component={LandingScreen} />
    <Stack.Screen name="signup" component={SignUpScreen} />
    <Stack.Screen name="signin" component={SignInScreen} />
    <Stack.Screen name="home" component={HomeScreen} />
    <Stack.Screen name="take" component={TakeScreen} />
    <Stack.Screen name="settings" component={SettingsScreen} />
  </Stack.Navigator>
);
export const AppNavigator = () => (
  <NavigationContainer>
    <OnboardingNavigator />
  </NavigationContainer>
);
