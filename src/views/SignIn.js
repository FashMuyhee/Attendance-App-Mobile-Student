import React from 'react';
import { StyleSheet } from 'react-native';
import { Hero, FormBody, ScrollContainer } from '../components';
import { Icon, Input, Button } from '@ui-kitten/components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import { inject, observer } from 'mobx-react';

const SignInScreen = (props) => {
  const [matric_no, setMatricNo] = React.useState('F/HD/18/3210023');
  const [password, setPassword] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (style) => (
    <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'} />
  );
  const renderUserIcon = (style) => <Icon {...style} name="person-outline" />;

  const handleLogin = () => {
    console.log('clicked');
    setLoading(true);
    const { setIsLoggedIn } = props.store
    setIsLoggedIn(true)
    setLoading(false);

    /*  axios({
                 method: 'post',
                 url: `http://192.168.43.102:3333/students/login`,
                 timeout: 20000,
                 data: {
                     matric_no: matric_no,
                 },
             })
             .then((data) => {
                 setLoading(false);
                 console.log(data);
             })
             .catch((error) => {
                 setLoading(false);
                 console.log(error);
             }); */
  };

  return (
    <ScrollContainer>
      <Hero title="Welcome Back" subTitle="Provide login details to continue" />
      <FormBody customStyle={styles.formBody}>
        <Input
          value={matric_no}
          placeholder="Matric No"
          icon={renderUserIcon}
          onChangeText={(value) => setMatricNo()}
          style={styles.input}
        />
        <Input
          value={password}
          placeholder="Password"
          icon={renderIcon}
          secureTextEntry={secureTextEntry}
          onIconPress={onIconPress}
          onChangeText={() => setPassword()}
          style={styles.input}
        />
        <Button onPress={handleLogin}>
          {loading ? 'Signing in ...' : ' Sign In'}
        </Button>
        <Button
          onPress={() => props.navigation.navigate('home')}
          appearance="ghost">
          home dashboard
        </Button>
      </FormBody>
    </ScrollContainer>
  );
};

export default inject('store')(observer(SignInScreen));
// export default SignInScreen;
const styles = StyleSheet.create({
  input: {
    marginBottom: hp('2%'),
  },
  formBody: {
    marginTop: hp('10%'),
  },
});
