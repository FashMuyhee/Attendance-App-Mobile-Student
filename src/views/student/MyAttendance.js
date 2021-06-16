import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Icon, TopNavigationAction, useTheme} from '@ui-kitten/components';
import { Navbar} from '../../components';
import DetailedRecord from './DetailedRecord';
import SummaryRecord from './SummaryRecord';
import {getStudentAllAttendance} from '../../controller/attendance';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const MyAttendanceScreen = ({navigation}) => {
  const Tab = createBottomTabNavigator();
  const navigateBack = () => {
    navigation.goBack();
  };
  const BackIcon = (style) => (
    <Icon {...style} name="arrow-back" fill="white" />
  );
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [detailedAttendance, setDetailedAttendance] = useState([]);

  useEffect(() => {
    setLoading(true);
    getStudentAllAttendance()
      .then((data) => {
        setDetailedAttendance(data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Navbar
        title="My Attendance"
        leftAction={<BackAction />}
        textStyle={styles.title}
      />
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: theme['color-primary-500'],
          style: {
            backgroundColor: 'white',
          },
          labelStyle: {
            alignItems: 'center',
            marginBottom: 15,
            fontFamily: 'Poppins-Regular',
          },
        }}>
        <Tab.Screen
          name="Detailed View"
          component={() => {
            return (
              <DetailedRecord
                renderData={detailedAttendance}
                loading={loading}
              />
            );
          }}
        />
        <Tab.Screen
          name="Summary View"
          component={() => {
            return (
              <SummaryRecord
                renderData={detailedAttendance}
                loading={loading}
              />
            );
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default MyAttendanceScreen

const styles = StyleSheet.create({
  title: {
    color: 'white',
  },
  tableText: {
    textTransform: 'capitalize',
  },
});
