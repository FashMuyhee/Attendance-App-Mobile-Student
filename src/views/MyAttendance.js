import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  Divider,
  Icon,
  Text,
  TopNavigationAction,
  styled,
  Button,
} from '@ui-kitten/components';
import {Container, Navbar} from '../components';
import {inject, observer} from 'mobx-react';
const BackIcon = (style) => <Icon {...style} name="arrow-back" fill="white" />;

const MyAttendanceScreen = ({navigation, store}) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
 
  return (
    <SafeAreaView style={{flex: 1}}>
      <Navbar
        title="My Attendance"
        leftAction={<BackAction />}
        textStyle={styles.title}
      />
      <Container>
        <Text>My Attendance List</Text>
      </Container>
    </SafeAreaView>
  );
};

export default inject('store')(observer(MyAttendanceScreen));
const styles = StyleSheet.create({
  title: {
    color: 'white',
  },
});
