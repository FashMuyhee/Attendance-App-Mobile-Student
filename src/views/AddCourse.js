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

const AddCourseScreen = ({navigation, store}) => {
  const navigateBack = () => {
    navigation.goBack();
  };
  const {user} = store;
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <>
      <Navbar
        title="Add Course"
        leftAction={<BackAction />}
        textStyle={styles.title}
      />
      <Container>
        <WelcomeNote
          bold={`Hi ${user.name.split(' ')[0]}`}
          normal="Let's add some courses"
          subtitle="Select your department,level,semester and the desired courses you need to add"
        />
      </Container>
    </>
  );
};

export default inject('store')(observer(AddCourseScreen));
const styles = StyleSheet.create({
  title: {
    color: 'white',
  },
});
``