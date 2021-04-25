import React from 'react';
import {View, StyleSheet} from 'react-native';
import {MyText} from '.';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function WelcomeNote({bold, normal, subtitle}) {
  return (
    <View style={styles.welcomeNote}>
      <MyText customStyle={styles.boldText} bold>
        {bold}! <MyText customStyle={styles.normalText} bold={false}>{normal} </MyText>
      </MyText>
      <MyText customStyle={styles.subtitleText}>{subtitle}</MyText>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeNote: {
    marginTop: hp('5%'),
    paddingLeft: '3%',
    paddingRight: '3%',
    // height: '30%',
    marginBottom: 10,
  },
  boldText: {
    fontSize: hp('3%'),
    textTransform: 'capitalize',
  },
  normalText: {
    fontSize: hp('3%'),
    textTransform: 'capitalize',
  },
  subtitleText: {
    fontSize: hp('2%'),
    textTransform: 'capitalize',
    color: '#d1d7de',
  },
});
