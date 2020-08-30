import React from 'react';
import { Layout, useStyleSheet, StyleService } from '@ui-kitten/components';

const Container = ({ children, customStyle }) => {
  const styles = useStyleSheet(themedStyles);
  const style = { ...styles.container, ...customStyle };

  return <Layout style={style}>{children}</Layout>;
};

export default Container;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: '5%',
    paddingRight: '5%',
    backgroundColor: 'background-basic-color-1',
  },
});
