import React from 'react';
import {View, Text} from 'react-native';
import {useStyleSheet, StyleService} from '@ui-kitten/components';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const DetailText = ({text}) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default DetailText;
const themedStyles = StyleService.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  text: {
    fontWeight: '200',
    fontSize: wp('5%'),
    marginBottom: 0,
    fontFamily: 'Poppins-Regular',
    color: 'color-text',
  },
});
