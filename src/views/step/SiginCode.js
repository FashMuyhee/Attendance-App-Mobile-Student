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
import {inject, observer} from 'mobx-react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TakeScreen} from '../student';

const SigninCode = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [signCode, setSignCode] = useState(null);
  const [modal, setModal] = useState(false);
  const styles = useStyleSheet(themedStyles);
  const checkSignInCode = () => {
    // get lecture location and save
    props.navigation.navigate('location', { lectureLocation: { lat: 6.5183143, lng: 3.3715918 } })
    // props.navigation.navigate('camera');
  };

  const handleSignOut = () => {
    setModal(true);
  };

  return (
    <TakeScreen>
      <WelcomeNote
        bold="Hi User"
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
              <Input placeholder="Sign in Code" style={styles.input} />
              <Button onPress={checkSignInCode}>Sign in for class</Button>
            </Layout>
          </Tab>
          <Tab title="Sign Out">
            <FormBody style={styles.tabContainer}>
              <Input
                placeholder="Sign out Code"
                style={styles.input}
                value={signCode}
                onChangeText={(code) => setSignCode(code)}
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

// export default inject('store')(observer(SigninCode));
export default SigninCode;
const themedStyles = StyleService.create({
  form: {
    paddingLeft: '9%',
    paddingRight: '9%',
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
