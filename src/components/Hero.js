import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Text} from '@ui-kitten/components';
import logo from '../assets/img/logo.png';
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
    width: '100%',
    height: '30%',
    paddingTop: '10%',
    marginTop: '12%',
    marginBottom: '5%',
    /* borderColor: 'black',
    borderWidth: 1, */
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 40,
    fontSize: 20,
  },
  subTitle: {
    fontSize: 13,
    fontWeight: '200',
  },
});
