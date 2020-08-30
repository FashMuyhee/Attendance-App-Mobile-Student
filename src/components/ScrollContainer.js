import React from 'react';
import { ScrollView } from 'react-native';
import { useStyleSheet, StyleService } from '@ui-kitten/components';

const ScrollContainer = ({ children, customStyle }) => {
  const styles = useStyleSheet(themedStyles);
  const style = { ...styles.container, ...customStyle };

  return <ScrollView style={style}>{children}</ScrollView>;
};

export default ScrollContainer;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: '5%',
    paddingRight: '5%',
    backgroundColor: 'background-basic-color-1',

  },
});
