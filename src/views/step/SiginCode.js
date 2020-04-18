import React from 'react';
import {
  StyleService,
  useStyleSheet,
  Text,
  Tab,
  TabView,
  Layout,
  Input,
  Button,
} from '@ui-kitten/components';
import {Container} from '../../components';
import {inject, observer} from 'mobx-react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const SigninCode = (props) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const styles = useStyleSheet(themedStyles);
  const checkSignInCode = () => {
    const {next, saveState} = props;
    saveState({name: 'samad'});
    console.log('from step1');
    next();
  };

  const goBack = () => {
    const {back} = props;
    back();
  };

  return (
    <>
      <Container customStyle={styles.welcomeNote}>
        <Text style={styles.boldText}>
          Hi User!{' '}
          <Text style={styles.normalText}>It's time for Attendance.</Text>
        </Text>
        <Text appearance="hint" style={styles.subtitleText}>
          Select an attendance action you intend to perform Sign in for a new
          class or signout for a finshed lecturer
        </Text>
      </Container>
      <Container customStyle={styles.form}>
        <TabView
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}>
          <Tab title="Sign In">
            <Layout style={styles.tabContainer}>
              <Input placeholder="Sign in Code" style={styles.input} />
              <Button onPress={checkSignInCode}>Sign in for class</Button>
            </Layout>
          </Tab>
          <Tab title="Sign Out">
            <Layout style={styles.tabContainer}>
              <Input placeholder="Sign out Code" style={styles.input} />
              <Button>Sign out for class</Button>
            </Layout>
          </Tab>
        </TabView>
      </Container>
    </>
  );
};

// export default inject('themeStore')(observer(SigninCode));
export default SigninCode;
const themedStyles = StyleService.create({
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
    fontSize: hp('3.3%'),
  },
  normalText: {
    fontSize: hp('3.3%'),
  },
  subtitleText: {
    fontSize: hp('2.3%'),
  },
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
