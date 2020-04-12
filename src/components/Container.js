import React from 'react';
import {StyleSheet} from 'react-native';
import {Layout} from '@ui-kitten/components';

const Container = ({children, customStyle}) => {
  const style = {...styles.container, ...customStyle};

  return <Layout style={style}>{children}</Layout>;
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
});
