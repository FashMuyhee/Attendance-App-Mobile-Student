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
  LoadingScreen,
  SignInScreen,
} from '../views';

import {
  StudAddCourse,
  StudCourse,
  StudRecord,
  TakeScreen,
} from '../views/student';

import {
  CreateAttendanceScreen,
  LectAddCourse,
  LectCourse,
  LectRecord,
} from '../views/lecturer';
import {inject, observer} from 'mobx-react';
import {SiginCode, Location, Camera} from '../views/step';

const Stack = createStackNavigator();

const AppNavigator = ({store}) => {
  const {isLoggedIn, user} = store;

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
            {/* <Stack.Screen name="loading" component={LoadingScreen} /> */}
            <Stack.Screen name="signup" component={SignUpScreen} />
            <Stack.Screen name="signin" component={SignInScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="settings" component={SettingsScreen} />
            {user.role === 'student' ? (
              <>
                <Stack.Screen name="att_signin" component={SiginCode} />
                <Stack.Screen name="location" component={Location} />
                <Stack.Screen name="camera" component={Camera} />
                <Stack.Screen name="stu_course" component={StudCourse} />
                <Stack.Screen name="stu_add_course" component={StudAddCourse} />
                <Stack.Screen name="stu_attendance" component={StudRecord} />
              </>
            ) : (
              <>
                <Stack.Screen name="lect_course" component={LectCourse} />
                <Stack.Screen
                  name="lect_add_course"
                  component={LectAddCourse}
                />
                <Stack.Screen name="lect_attendance" component={LectRecord} />
                <Stack.Screen
                  name="create_attendance"
                  component={CreateAttendanceScreen}
                />
              </>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default inject('store')(observer(AppNavigator));
