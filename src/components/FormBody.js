import React from 'react';
import {KeyboardAvoidingView, StyleSheet} from 'react-native';
const FormBody = ({children, customStyle}) => {
  const style = {...styles.formBody, ...customStyle};
  return <KeyboardAvoidingView style={style}>{children}</KeyboardAvoidingView>;
};

export default FormBody;

const styles = StyleSheet.create({
  formBody: {
    marginTop: '10%',
    width: '100%',
    /*  borderColor: 'red',
    borderWidth: 1, */
  },
});
