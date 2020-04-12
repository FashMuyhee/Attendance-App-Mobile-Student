import React from 'react';
import {View, StyleSheet} from 'react-native';
// import {Tab, TabView} from '@ui-kitten/components';
import {Hero, StudentForm, ScrollContainer} from '../components';

const SignUpScreen = () => {
  // const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <ScrollContainer>
      <Hero
        title="Great to have you are here."
        subTitle="Provide details to complete Sign up"
        customStyle={styles.hero}
      />

      <View style={styles.content}>
        <StudentForm />
      </View>
    </ScrollContainer>
  );
};

export default SignUpScreen;
const styles = StyleSheet.create({
  content: {
    marginTop: '5%',
    /* borderWidth: 1,
    borderColor: 'green', */
  },
  hero: {
    height: '25%',
  },
});
