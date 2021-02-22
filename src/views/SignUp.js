import React from 'react';
import {StyleSheet} from 'react-native';
import {Tab, TabView} from '@ui-kitten/components';
import {Hero, StudentForm, ScrollContainer, LecturerForm} from '../components';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const SignUpScreen = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  return (
    <ScrollContainer customStyle={styles.content}>
      <Hero
        title="Great to have you are here."
        subTitle="Provide details to complete Sign up"
      />
      <TabView
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
        useNativeDriver={true}>
        <Tab title="Lecturer">
          <LecturerForm />
        </Tab>
        <Tab title="Student">
          <StudentForm />
        </Tab>
      </TabView>
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
