import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Text} from '@ui-kitten/components';
import logo from '../assets/img/logo.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Hero = ({subTitle, title, customStyle}) => {
  const style = {...styles.hero, ...customStyle};

  return (
    <View style={style}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
};

export default Hero;

const styles = StyleSheet.create({
  hero: {
    // width: wp('100%'),
    height: hp('25%'),
    // paddingTop: hp('10%'),
    marginTop: hp('6%'),
    marginBottom: hp('2%'),
    /* borderColor: 'black',
    borderWidth: 1, */
  },
  logo: {
    width: wp('16%'),
    height: hp('9%'),
  },
  title: {
    fontWeight: 'bold',
    marginTop: hp('6%'),
    fontSize: hp('3.3%'),
  },
  subTitle: {
    fontSize: hp('2.5%'),
    fontWeight: '200',
  },
});
