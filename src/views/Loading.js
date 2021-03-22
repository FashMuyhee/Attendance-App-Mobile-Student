import React,{useEffect} from 'react';
import {View, StyleSheet, Image, SafeAreaView, StatusBar} from 'react-native';
import {Text, Spinner} from '@ui-kitten/components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import logo from '../assets/img/logo.png';

const LoadingScreen = () => {
  return (
    <SafeAreaView style={style.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <View style={style.loader}>
        <Image source={logo} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: 100,
          }}>
          <Spinner status="primary" />
          <Text>LOADING ...</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoadingScreen;
const style = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  loader: {
    width: wp('100%'),
    height: hp('24%'),
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
