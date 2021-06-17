import React, {useState} from 'react';
import {
  StyleService,
  useStyleSheet,
  Tab,
  TabView,
  Layout,
  Input,
  Button,
} from '@ui-kitten/components';
import {Container, FormBody, ModalAlert, WelcomeNote} from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TakeScreen} from '../student';
import {getAttendanceLocation} from '../../controller/attendance';
import Snackbar from 'react-native-snackbar';
import {useSelector, useDispatch} from 'react-redux';
import {saveLectureLocation} from '../../store/action';

const SigninCode = ({navigation}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [signCode, setSignCode] = useState('');
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const styles = useStyleSheet(themedStyles);
  const {user} = useSelector((state) => state.app_store);
  const dispatch = useDispatch();

  const checkSignInCode = () => {
    // get lecture location and save
    setLoading(true);
    getAttendanceLocation({code: signCode})
      .then((data) => {
        setLoading(false);
        console.log(data);
        if (data?.type === 'error') {
          setLoading(false);
          return Snackbar.show({
            text: data.error.toUpperCase(),
            duration: Snackbar.LENGTH_SHORT,
            textColor: 'white',
          });
        }
        const {location} = data.message;
        const parsedLocation = JSON.parse(location);
        dispatch(saveLectureLocation(parsedLocation));
        navigation.navigate('location', {
          lectureLocation: {
            lat: parsedLocation.lat,
            lng: parsedLocation.lng,
          },
          code: signCode,
          type: 'sign_in',
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleSignOut = () => {
    navigation.navigate('location', {
      code: signCode,
      type: 'sign_out',
    });
  };

  return (
    <TakeScreen>
      <WelcomeNote
        bold={`Hi ${user.name.split(' ')[0]}`}
        normal="It's time for Attendance"
        subtitle="Select an attendance action you intend to perform Sign in for a new
        class or signout for a finished lecturer"
      />
      <Container customStyle={styles.form}>
        <TabView
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
          useNativeDriver={true}>
          <Tab title="Sign In">
            <Layout style={styles.tabContainer}>
              <Input
                placeholder="Sign in Code"
                style={styles.input}
                onChangeText={setSignCode}
                onSubmitEditing={checkSignInCode}
              />
              <Button onPress={checkSignInCode} disabled={loading}>
                Sign in for class
              </Button>
            </Layout>
          </Tab>
          <Tab title="Sign Out">
            <FormBody style={styles.tabContainer}>
              <Input
                placeholder="Sign out Code"
                style={styles.input}
                value={signCode}
                onChangeText={(code) => setSignCode(code)}
                onSubmitEditing={handleSignOut}
              />
              <Button onPress={handleSignOut}>Sign out for class</Button>
            </FormBody>
          </Tab>
        </TabView>
      </Container>
      <ModalAlert
        warn={false}
        isVisible={modal}
        closeModal={() => setModal(false)}
        message="You've signed out for Compiler Construction successfully"
        subtitle="Glad you stayed till the end,means you have perfect attendance today"
        btnText="Close"
      />
    </TakeScreen>
  );
};

export default SigninCode;
const themedStyles = StyleService.create({
  form: {
    paddingLeft: '5%',
    paddingRight: '5%',
    marginTop: hp('8%'),
  },
  tabContainer: {
    justifyContent: 'center',
    marginTop: '10%',
  },
  input: {
    marginBottom: '5%',
  },
});
