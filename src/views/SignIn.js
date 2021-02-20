import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Hero, FormBody, ScrollContainer} from '../components';
import {Icon, Input, Button, TabView, Tab} from '@ui-kitten/components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {inject, observer} from 'mobx-react';
import {login, profile} from '../models/auth';
import Snackbar from 'react-native-snackbar';

const SignInScreen = (props) => {
  const [matric_no, setMatricNo] = useState('F/HD/18/3210049');
  const [password, setPassword] = useState('rootuser');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (style) => (
    <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'} />
  );
  const renderUserIcon = (style) => <Icon {...style} name="person-outline" />;

  const handleStudentLogin = () => {
    setLoading(true);
    const {setIsLoggedIn, setUser} = props.store;

    login({matric_no, password})
      .then((data) => {
        const token = data;
        setLoading(false);

        console.log(token);
        profile(token)
          .then((res) => {
            const authUser = {
              id: res.id,
              name: res.fullname,
              matric_no: res.matric_no,
              department: res.department,
              level: res.level,
              role: 'student',
            };
            setUser({...authUser});
            setIsLoggedIn(true);
            setLoading(false);
            Snackbar.show({
              text: `Welcome back ${res.fullname}`,
              duration: Snackbar.LENGTH_SHORT,
              textColor: 'white',
              action: {
                text: 'ok',
                textColor: 'green',
                onPress: () => {
                  Snackbar.dismiss();
                },
              },
            });
          })
          .catch((data) => {
            console.log(data);
          });
      })
      .catch((error) => {
        Snackbar.show({
          text: error.toUpperCase(),
          duration: Snackbar.LENGTH_SHORT,
          textColor: 'red',
          action: {
            text: 'ok',
            textColor: 'red',
            onPress: () => {
              Snackbar.dismiss();
            },
          },
        });
        setLoading(false);
      });
  };

  const handleLectuerLogin = () => {
    setLoading(true);
    const {setIsLoggedIn, user, setUser} = props.store;
    setUser({...user, role: 'lectuer'});
    setIsLoggedIn(true);
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
      <TabView
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
        useNativeDriver={true}>
        <Tab title="Lecturer">
          <FormBody customStyle={styles.formBody}>
            <Input
              placeholder="Matric No"
              icon={renderUserIcon}
              onChangeText={(value) => setMatricNo(value)}
              style={styles.input}
            />
            <Input
              placeholder="Password"
              icon={renderIcon}
              secureTextEntry={secureTextEntry}
              onIconPress={onIconPress}
              onChangeText={(value) => setPassword(value)}
              style={styles.input}
            />
            <Button onPress={handleLectuerLogin}>
              {loading ? 'Signing in ...' : ' Sign In'}
            </Button>
          </FormBody>
        </Tab>
        <Tab title="Student">
          <FormBody customStyle={styles.formBody}>
            <Input
              placeholder="Matric No"
              icon={renderUserIcon}
              onChangeText={(value) => setMatricNo(value)}
              style={styles.input}
            />
            <Input
              placeholder="Password"
              icon={renderIcon}
              secureTextEntry={secureTextEntry}
              onIconPress={onIconPress}
              onChangeText={(value) => setPassword(value)}
              style={styles.input}
            />
            <Button onPress={handleStudentLogin} disabled={loading}>
              {loading ? 'Signing in ...' : ' Sign In'}
            </Button>
          </FormBody>
        </Tab>
      </TabView>
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
    marginTop: hp('5%'),
  },
});
