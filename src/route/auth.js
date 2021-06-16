import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {LandingScreen, SignUpScreen, SignInScreen} from '../views';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="landing"
      screenOptions={{
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="landing" component={LandingScreen} />
      <Stack.Screen name="signup" component={SignUpScreen} />
      <Stack.Screen name="signin" component={SignInScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
