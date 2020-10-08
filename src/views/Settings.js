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

const SettingsScreen = ({navigation, store}) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  const {toggleTheme, myTheme} = store;
  console.log(myTheme);
  return (
    <>
      <Navbar
        title="Settings"
        leftAction={<BackAction />}
        textStyle={styles.title}
      />
      <Container>
        <Button onPress={() => toggleTheme(myTheme)}>Change Theme</Button>
      </Container>
    </>
  );
};

export default inject('store')(observer(SettingsScreen));
const styles = StyleSheet.create({
  title: {
    color: 'white',
  },
});
