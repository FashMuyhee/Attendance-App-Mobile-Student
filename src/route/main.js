import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {HomeScreen, SettingsScreen} from '../views';
import {StudAddCourse, StudCourse, StudRecord} from '../views/student';
import {
  CreateAttendanceScreen,
  LectAddCourse,
  LectCourse,
  LectRecord,
  AttendanceQueryScreen,
} from '../views/lecturer';
import {SiginCode, Location, Camera} from '../views/step';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const {user} = useSelector((state) => state.app_store);

  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="landing"
      screenOptions={{
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
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
          <Stack.Screen name="lect_add_course" component={LectAddCourse} />
          <Stack.Screen name="lect_attendance" component={LectRecord} />
          <Stack.Screen
            name="lect_attendance_query"
            component={AttendanceQueryScreen}
          />
          <Stack.Screen
            name="create_attendance"
            component={CreateAttendanceScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
