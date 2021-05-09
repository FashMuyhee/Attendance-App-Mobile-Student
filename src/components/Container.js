import React from 'react';
import {Layout, useStyleSheet, StyleService} from '@ui-kitten/components';

const Container = ({children, customStyle, pad = true}) => {
  const styles = useStyleSheet(themedStyles);
  const style = [
    styles.container,
    customStyle,
    {paddingHorizontal: pad ? '7%' : 0},
  ];

  return <Layout style={style}>{children}</Layout>;
};

export default Container;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'background-basic-color-1',
  },
});
