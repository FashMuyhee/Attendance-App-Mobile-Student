import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  Divider,
  Icon,
  Text,
  TopNavigationAction,
  styled,
  Button,
  Select,
} from '@ui-kitten/components';
import {Container, Navbar, WelcomeNote} from '../../components';
import {inject, observer} from 'mobx-react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const BackIcon = (style) => <Icon {...style} name="arrow-back" fill="white" />;

const AddCourseScreen = ({navigation, store}) => {
  const navigateBack = () => {
    navigation.goBack();
  };
  const {user} = store;
  
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  const data = [{text: 'Option 1'}, {text: 'Option 2'}, {text: 'Option 3'}];
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
      <Navbar
        title="Add Course"
        leftAction={<BackAction />}
        textStyle={styles.title}
      />
      <Container>
        <WelcomeNote
          bold={`Hi ${user.name.split(' ')[0]}`}
          normal="Let's add some courses"
          subtitle="Select your department,level,semester and the desired courses you need to add"
        />
        <Select
          data={data}
          selectedOption={selectedOption}
          onSelect={setSelectedOption}
          style={styles.input}
          placeholder="Select Courses"
        />
        <Button>Register Course</Button>
      </Container>
    </>
  );
};

export default inject('store')(observer(AddCourseScreen));
const styles = StyleSheet.create({
  title: {
    color: 'white',
  },
  input: {
    marginBottom: hp('2%'),
    padding: 20,
  },
});
``;
