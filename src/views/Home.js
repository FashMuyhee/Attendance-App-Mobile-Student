import React from 'react';
import {
  TopNavigationAction,
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
} from '@ui-kitten/components';
import {View, Image, TouchableWithoutFeedback} from 'react-native';
import {Navbar, DetailText, Box} from '../components';
import avatar from '../assets/img/user.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import {logout as logoutUser} from '../store/action';

const HomeScreen = ({navigation, store}) => {
  const styles = useStyleSheet(themedStyles);
  const SettingIcon = (style) => (
    <Icon {...style} fill="white" name="settings-outline" />
  );

  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.app_store);

  const logout = async () => {
    dispatch(logoutUser());
  };

  const DashboardActionStudent = () => (
    <View style={styles.actions}>
      <Box icon="edit-outline" route="att_signin" title="Take Attendance" />
      <Box icon="clipboard-outline" route="stu_course" title="Courses" />
      <Box
        icon="list-outline"
        route="stu_attendance"
        title="Attendance Record"
      />
      <Box icon="log-out-outline" title="Sign Out" xtraOnPress={logout} />
    </View>
  );

  const DashboardActionLecturer = () => (
    <View style={styles.actions}>
      <Box
        icon="edit-outline"
        route="create_attendance"
        title="Create Attendance"
      />
      <Box icon="clipboard-outline" route="lect_course" title="My Courses" />
      <Box
        icon="list-outline"
        route="lect_attendance_query"
        title="Attendance Record"
      />
      <Box icon="log-out-outline" title="Sign Out" xtraOnPress={logout} />
    </View>
  );

  return (
    <Layout style={styles.dashboard}>
      <Navbar
        title="Dashboard"
        textStyle={styles.title}
        rightAction={
          <TopNavigationAction
            icon={SettingIcon}
            onPress={() => navigation.navigate('settings')}
          />
        }
      />
      <TouchableWithoutFeedback onPress={() => navigation.navigate('settings')}>
        <View style={styles.profile}>
          <View style={styles.avatarWrapper}>
            <Image
              source={user.dp === null ? avatar : {uri: user.dp}}
              style={styles.avatar}
            />
          </View>
          <View style={styles.details}>
            <DetailText text={user.name} />
            <DetailText text={user.matric_no} />
            <DetailText text={user.department} />
            <DetailText text={user.level} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      {user.role === 'student' ? (
        <DashboardActionStudent />
      ) : (
        <DashboardActionLecturer />
      )}
    </Layout>
  );
};

export default HomeScreen;

const themedStyles = StyleService.create({
  dashboard: {
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  navBar: {
    backgroundColor: 'color-primary-default',
    color: 'white',
  },
  title: {
    color: 'white',
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    height: hp('30%'),
    paddingLeft: '2%',
    paddingRight: '2%',
    backgroundColor: 'background-basic-color-1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'background-basic-color-4',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 8,
    width: '93%',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: hp('5'),
  },
  avatarWrapper: {
    /*  borderColor: 'red',
    borderWidth: 1, */
    width: '35%',
    alignSelf: 'center',
    // paddingLeft: '2%',
  },
  avatar: {
    width: wp(30),
    height: hp(16),
    borderRadius: 100,
    justifyContent: 'center',
  },
  details: {
    alignSelf: 'center',
    width: '65%',
    /*  borderColor: 'yellow',
    borderWidth: 1, */
  },
  actions: {
    width: '100%',
    height: hp('50%'),
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '4%',
    paddingRight: '3%',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});
