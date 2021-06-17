import React from 'react';
import {
  TopNavigationAction,
  StyleService,
  useStyleSheet,
  Icon,
} from '@ui-kitten/components';
import {Navbar, ScrollContainer} from '../../components';

import {useNavigation} from '@react-navigation/native';

const TakeScreen = (props) => {
  const styles = useStyleSheet(themedStyles);
  const BackIcon = (style) => (
    <Icon {...style} fill="white" name="arrow-back" />
  );

  const navigation = useNavigation();

  return (
    <>
      <Navbar
        title="Take Attendance"
        textStyle={styles.title}
        leftAction={
          <TopNavigationAction
            icon={BackIcon}
            onPress={() => navigation.goBack()}
          />
        }
      />
      <ScrollContainer customStyle={styles.screen}>
        {props.children}
      </ScrollContainer>
    </>
  );
};

export default TakeScreen;

const themedStyles = StyleService.create({
  screen: {
    // height: '100%',
    width: '100%',
    position: 'relative',
    paddingHorizontal: '3%',
    backgroundColor: 'background-basic-color-1',
  },
  navBar: {
    backgroundColor: 'color-primary-default',
    color: 'white',
  },
  title: {
    color: 'white',
  },
});
