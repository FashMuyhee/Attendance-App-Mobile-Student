import React from 'react';
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';

const Navbar = ({title, subTitle, textStyle, leftAction, rightAction}) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <TopNavigation
      title={title}
      titleStyle={textStyle}
      subtitle={subTitle}
      alignment="start"
      style={styles.navBar}
      rightControls={rightAction}
      leftControl={leftAction}
    />
  );
};

export default Navbar;
const themedStyles = StyleService.create({
  navBar: {
    backgroundColor: 'color-primary-default',
    color: 'white',
  },
});
