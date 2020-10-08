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
import {Container, Navbar, WelcomeNote} from '../components';
import {inject, observer} from 'mobx-react';
const BackIcon = (style) => <Icon {...style} name="arrow-back" fill="white" />;

const MyCourseScreen = ({navigation, store}) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  const {user} = store;

  return (
    <>
      <Navbar
        title="My Courses"
        leftAction={<BackAction />}
        textStyle={styles.title}
      />
      <Container>
        <WelcomeNote
          bold={`Hi ${user.name.split(" ")[0]}`}
          normal="Here are your courses"
          subtitle="below ate the courses offered by you,you can choose to add more at any given time by by clicking the `+` button"
        />
        <Button onPress={() => navigation.navigate('add_course')}>
          Add Course
        </Button>
      </Container>
    </>
  );
};

export default inject('store')(observer(MyCourseScreen));
const styles = StyleSheet.create({
  title: {
    color: 'white',
  },
});
