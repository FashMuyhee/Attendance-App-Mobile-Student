import React from 'react';
import {Text} from 'react-native';
import {useStyleSheet, StyleService} from '@ui-kitten/components';

const MyText = ({children, customStyle, bold}) => {
  const styles = useStyleSheet(themedStyles);
  const style = [customStyle,styles.my_text,{fontFamily:bold?"Poppins-Bold":"Poppins-Regular"}];
  return (
    <>
      <Text style={style}>{children}</Text>
    </>
  );
};

export default MyText;
const themedStyles = StyleService.create({
  my_text: {
    color: 'color-text',
    fontFamily: 'Poppins-Regular',
  },
});
