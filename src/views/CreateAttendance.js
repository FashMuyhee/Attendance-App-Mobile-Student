import React, {useState} from 'react';
import {
  TopNavigationAction,
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
  Select,
  Tab,
  TabView,
  Button,
} from '@ui-kitten/components';
import {
  Navbar,
  ScrollContainer,
  Container,
  MyText,
  FormBody,
} from '../components';
import {inject, observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CreateAttendanceScreen = (props) => {
  const styles = useStyleSheet(themedStyles);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const data = [{text: 'Option 1'}, {text: 'Option 2'}, {text: 'Option 3'}];

  const BackIcon = (style) => (
    <Icon {...style} fill="white" name="arrow-back" />
  );

  const navigation = useNavigation();

  return (
    <>
      <Navbar
        title="Create Attendance"
        textStyle={styles.title}
        leftAction={
          <TopNavigationAction
            icon={BackIcon}
            onPress={() => navigation.goBack()}
          />
        }
      />
      <ScrollContainer customStyle={styles.screen}>
        <Container customStyle={styles.welcomeNote}>
          <MyText customStyle={styles.boldText}>
            Hi Lecture Name!{' '}
            <MyText customStyle={styles.normalText}>Begin Attendance.</MyText>
          </MyText>
          <MyText customStyle={styles.subtitleText}>
            Select an attendance action you intend to perform create Sign-in
            code for a new class or sign-out for a finished lecturer
          </MyText>
        </Container>
        <Container customStyle={styles.form}>
          <TabView
            selectedIndex={selectedIndex}
            onSelect={(index) => setSelectedIndex(index)}
            useNativeDriver={true}>
            <Tab title="Class Sign In">
              <Layout style={styles.form}>
                <Select
                  data={data}
                  selectedOption={selectedOption}
                  onSelect={setSelectedOption}
                  style={styles.input}
                  placeholder="Select Course"
                />
                <Button>Create Sign-In Code</Button>
              </Layout>
            </Tab>
            <Tab title="Class Sign Out">
              <FormBody style={styles.form}>
                <Select
                  data={data}
                  selectedOption={selectedOption}
                  onSelect={setSelectedOption}
                  style={styles.input}
                  placeholder="Select Course"
                />
                <Button>Create Sign-Out Code</Button>
              </FormBody>
            </Tab>
          </TabView>
        </Container>
      </ScrollContainer>
    </>
  );
};

export default inject('store')(observer(CreateAttendanceScreen));
const themedStyles = StyleService.create({
  screen: {
    // height: '100%',
    width: '100%',
    position: 'relative',
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: 'background-basic-color-1',
  },
  navBar: {
    backgroundColor: 'color-primary-default',
    color: 'white',
  },
  welcomeNote: {
    /*  borderColor: 'yellow',
    borderWidth: 1, */
    marginTop: hp('10%'),
    paddingLeft: '9%',
    paddingRight: '9%',
    height: hp('12%'),
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: hp('3%'),
  },
  normalText: {
    fontSize: hp('3%'),
  },
  subtitleText: {
    fontSize: hp('2%'),
    color: 'color-basic-400',
  },
  title: {
    color: 'white',
  },
  form: {
    marginTop: '10%',
  },
  input: {
    marginBottom: hp('2%'),
  },
  button: {
    marginBottom: hp('4%'),
  },
});
