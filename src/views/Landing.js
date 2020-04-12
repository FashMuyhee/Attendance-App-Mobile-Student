import React from 'react';
import {View, ImageBackground, StyleSheet, Image} from 'react-native';
import student from '../assets/img/student.png';
import bg from '../assets/img/bg.png';
import {Text, Button} from '@ui-kitten/components';
const LandingScreen = (props) => {
  return (
    <>
      <View style={style.container}>
        <Image source={student} style={style.student} />
        <ImageBackground source={bg} style={style.imageBg}>
          <View style={style.content}>
            <Text style={style.boldenText} category="h5">
              Welcome to
            </Text>
            <Text style={style.boldenText} category="h5">
              Yaba College of Technology
            </Text>
            <Text style={style.ligthenText} category="h5">
              Student Attendance System
            </Text>
            <View style={style.authButtons}>
              <Button
                onPress={() => props.navigation.navigate('signin')}
                style={style.btn}>
                Sign In
              </Button>
              <Button
                onPress={() => props.navigation.navigate('signup')}
                style={style.btn}>
                Sign Up
              </Button>
            </View>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

export default LandingScreen;
const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    position: 'relative',
    flex: 1,
  },
  imageBg: {
    width: '100%',
    height: '100%',
    // zIndex: 2,
    display: 'flex',
    justifyContent: 'space-around',
  },
  student: {
    position: 'absolute',
    width: '100%',
    height: '90%',
    zIndex: 0,
    top: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    zIndex: 3,
    position: 'absolute',
    bottom: '5%',
    width: '100%',
    alignItems: 'flex-start',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  boldenText: {
    fontWeight: '700',
    color: 'white',
    fontSize: 14,
  },
  ligthenText: {
    fontWeight: '100',
    fontSize: 12,
    color: 'white',
  },
  authButtons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: '10%',
    width: '100%',
  },
  btn: {
    backgroundColor: 'transparent',
    color: 'white',
    borderColor: 'white',
    borderWidth: 1,
    paddingLeft: '12%',
    paddingRight: '12%',
  },
});
