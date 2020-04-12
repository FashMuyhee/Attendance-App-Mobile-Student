import React from 'react';
import {
  TopNavigationAction,
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
} from '@ui-kitten/components';
import {View, Image} from 'react-native';
import {Navbar, DetailText, Box} from '../components';
import {inject, observer} from 'mobx-react';
import user from '../assets/img/user.jpg';
const HomeScreen = (props) => {
  const styles = useStyleSheet(themedStyles);
  const SettingIcon = (style) => (
    <Icon {...style} fill="white" name="settings-outline" />
  );
  return (
    <Layout style={styles.dashboard}>
      <Navbar
        title="Dashboard"
        textStyle={styles.title}
        rightAction={
          <TopNavigationAction
            icon={SettingIcon}
            onPress={() => props.navigation.navigate('settings')}
          />
        }
      />
      <View style={styles.profile}>
        <View style={styles.avatarWrapper}>
          <Image source={user} style={styles.avatar} />
        </View>
        <View style={styles.details}>
          <DetailText subtitle="Ebenezer Arobadi" />
          <DetailText subtitle="F/HD/18/3210023" />
          <DetailText subtitle="Computer Technology" />
          <DetailText subtitle="HND2" />
        </View>
      </View>
      <View style={styles.actions}>
        <Box icon="edit-outline" title="Take Attendance" />
        <Box icon="clipboard-outline" title="Courses" />
        <Box icon="list-outline" title="Attendance Record" />
        <Box icon="log-out-outline" title="Sign Out" />
      </View>
    </Layout>
  );
};

export default inject('themeStore')(observer(HomeScreen));
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
    height: '30%',
    paddingLeft: '2%',
    paddingRight: '2%',
  },
  avatarWrapper: {
    /*  borderColor: 'red',
    borderWidth: 1, */
    width: '35%',
    alignSelf: 'center',
    paddingLeft: '2%',
  },
  avatar: {
    width: 100,
    height: 100,
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
    height: '50%',
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '7%',
    paddingRight: '3%',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});
