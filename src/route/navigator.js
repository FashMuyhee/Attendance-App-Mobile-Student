import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  HomeScreen,
  SettingsScreen,
  LandingScreen,
  SignUpScreen,
  SignInScreen,
  TakeScreen,
  AddCourse,
  MyCourse,
  MyAttendance
} from '../views';

const Stack = createStackNavigator();
/* const MainNavigator = () => (
  <Stack.Navigator headerMode="none">

  </Stack.Navigator>
); */

const OnboardingNavigator = () => (
  <Stack.Navigator headerMode="none" initialRouteName="landing">
    <Stack.Screen name="landing" component={LandingScreen} />
    <Stack.Screen name="signup" component={SignUpScreen} />
    <Stack.Screen name="signin" component={SignInScreen} />
    <Stack.Screen name="home" component={HomeScreen} />
    <Stack.Screen name="take" component={TakeScreen} />
    <Stack.Screen name="settings" component={SettingsScreen} />
    <Stack.Screen name="my_course" component={MyCourse} />
    <Stack.Screen name="add_course" component={AddCourse} />
    <Stack.Screen name="my_attendance" component={MyAttendance} />
  </Stack.Navigator>
);
export const AppNavigator = () => (
  <NavigationContainer>
    <OnboardingNavigator />
  </NavigationContainer>
);
