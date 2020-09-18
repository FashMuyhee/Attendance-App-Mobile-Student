import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';
import {
  HomeScreen,
  SettingsScreen,
  LandingScreen,
  SignUpScreen,
  SignInScreen,
  TakeScreen,
  AddCourse,
  MyCourse,
  MyAttendance,
  CreateAttendanceScreen,
} from '../views';

import {inject, observer} from 'mobx-react';
import {SiginCode, Location, Camera} from '../views/step';

const Stack = createStackNavigator();

const AppNavigator = ({store}) => {
  const {isLoggedIn} = store;
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        initialRouteName="landing"
        screenOptions={{
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="landing" component={LandingScreen} />
            <Stack.Screen name="signup" component={SignUpScreen} />
            <Stack.Screen name="signin" component={SignInScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="home" component={HomeScreen} />
            {/* <Stack.Screen name="take" component={TakeScreen} /> */}
            <Stack.Screen name="att_signin" component={SiginCode} />
            <Stack.Screen name="location" component={Location} />
            <Stack.Screen name="camera" component={Camera} />
            <Stack.Screen name="settings" component={SettingsScreen} />
            <Stack.Screen name="my_course" component={MyCourse} />
            <Stack.Screen name="add_course" component={AddCourse} />
            <Stack.Screen name="my_attendance" component={MyAttendance} />
            <Stack.Screen
              name="create_attendance"
              component={CreateAttendanceScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default inject('store')(observer(AppNavigator));
