import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
const ScrollContainer = ({children, customStyle}) => {
  const style = {...styles.container, ...customStyle};

  return <ScrollView style={style}>{children}</ScrollView>;
};

export default ScrollContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
});
