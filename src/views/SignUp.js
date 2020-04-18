import React from 'react';
import {StyleSheet} from 'react-native';
// import {Tab, TabView} from '@ui-kitten/components';
import {Hero, StudentForm, ScrollContainer} from '../components';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const SignUpScreen = () => {
  // const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <ScrollContainer customStyle={styles.content}>
      <Hero
        title="Great to have you are here."
        subTitle="Provide details to complete Sign up"
      />

      <StudentForm />
    </ScrollContainer>
  );
};

export default SignUpScreen;
const styles = StyleSheet.create({
  content: {
    height: hp('100%'),
    /*  borderWidth: 1,
    borderColor: 'green', */
  },
});
