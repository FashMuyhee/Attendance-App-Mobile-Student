import React, {useState, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {Hero, FormBody, ScrollContainer} from '../components';
import {Icon, Input, Button, TabView, Tab, Text} from '@ui-kitten/components';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {inject, observer} from 'mobx-react';
import {
  login,
  profile,
  lecturerProfile,
  lecturerLogin,
} from '../controller/auth';
import Snackbar from 'react-native-snackbar';
import {Formik} from 'formik';
import {lecturerLoginSchema, studentLoginSchema} from '../helpers/validator';
import {saveUser, saveUserToken} from '../store/action';
import {useDispatch} from 'react-redux';
import axios from 'axios';

const SignInScreen = (props) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch();

  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (style) => (
    <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'} />
  );

  const renderUserIcon = (style) => <Icon {...style} name="person-outline" />;
  const renderEmailIcon = (style) => <Icon {...style} name="email-outline" />;

  // USE REFS
  const passwordInput = useRef(null);
  const password2Input = useRef(null);

  const handleStudentLogin = (values) => {
    setLoading(true);

    login(values)
      .then((data) => {
        const token = data;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        dispatch(saveUserToken(token));
        profile()
          .then((res) => {
            const authUser = {
              name: res.fullname,
              role: 'student',
              ...res,
            };
            dispatch(saveUser(authUser));
            const userCredentials = {
              uid: values.matric_no,
              password: values.password,
              role: 'student',
            };
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
            setLoading(false);
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

  const handleLecturerLogin = (values) => {
    setLoading(true);

    lecturerLogin(values)
      .then((data) => {
        const token = data;
        dispatch(saveUserToken(token));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        lecturerProfile()
          .then(({user}) => {
            const authUser = {
              id: user.id,
              matric_no: user.staff_no,
              name: user.fullname,
              ...user,
              role: 'lecturer',
            };
            dispatch(saveUser(authUser));
            const userCredentials = {
              uid: values.email,
              password: values.password,
              role: 'lecturer',
            };
            setLoading(false);
            Snackbar.show({
              text: `Welcome back ${user.fullname}`,
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
            setLoading(false);
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

  return (
    <ScrollContainer>
      <Hero title="Welcome Back" subTitle="Provide login details to continue" />
      <TabView
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
        useNativeDriver={true}>
        <Tab title="Lecturer">
          <Formik
            initialValues={{
              email: 'okikiola76@yahoo.com',
              password: 'rootuser',
            }}
            onSubmit={handleLecturerLogin}
            validationSchema={lecturerLoginSchema}>
            {({handleChange, handleSubmit, errors, touched}) => (
              <FormBody customStyle={styles.formBody}>
                <Input
                  placeholder="Email"
                  icon={renderEmailIcon}
                  onChangeText={handleChange('email')}
                  style={styles.input}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInput.current.focus()}
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <Input
                  ref={passwordInput}
                  placeholder="Password"
                  icon={renderIcon}
                  secureTextEntry={secureTextEntry}
                  onIconPress={onIconPress}
                  onChangeText={handleChange('password')}
                  style={styles.input}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                />
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <Button onPress={handleSubmit} disabled={loading}>
                  {loading ? 'Signing in ...' : ' Sign In'}
                </Button>
              </FormBody>
            )}
          </Formik>
        </Tab>
        <Tab title="Student">
          <Formik
            initialValues={{
              matric_no: 'F/HD/18/3210014',
              password: 'rootuser',
            }}
            onSubmit={handleStudentLogin}
            validationSchema={studentLoginSchema}>
            {({handleChange, handleSubmit, errors, touched}) => (
              <FormBody customStyle={styles.formBody}>
                <Input
                  placeholder="Matric No"
                  icon={renderUserIcon}
                  onChangeText={handleChange('matric_no')}
                  style={styles.input}
                  returnKeyType="next"
                  onSubmitEditing={() => password2Input.current.focus()}
                />
                {errors.matric_no && touched.matric_no && (
                  <Text style={styles.errorText}>{errors.matric_no}</Text>
                )}
                <Input
                  ref={password2Input}
                  placeholder="Password"
                  icon={renderIcon}
                  secureTextEntry={secureTextEntry}
                  onIconPress={onIconPress}
                  onChangeText={handleChange('password')}
                  style={styles.input}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                />
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <Button onPress={handleSubmit} disabled={loading}>
                  {loading ? 'Signing in ...' : ' Sign In'}
                </Button>
              </FormBody>
            )}
          </Formik>
        </Tab>
      </TabView>
    </ScrollContainer>
  );
};

export default SignInScreen;
const styles = StyleSheet.create({
  input: {
    marginBottom: hp('2%'),
  },
  formBody: {
    marginTop: hp('5%'),
  },
  errorText: {
    color: 'tomato',
    fontSize: 12,
    marginBottom: 10,
  },
});
