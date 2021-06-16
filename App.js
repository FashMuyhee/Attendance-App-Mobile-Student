/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {mapping, dark, light} from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {default as customLightTheme} from './src/config/light-theme.json';
import {default as customDarkTheme} from './src/config/dark-theme.json';
import {default as customMapping} from './src/config/custom-mapping.json';
import {inject, observer} from 'mobx-react';
import AppNavigator from './src/route/navigator';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import {
  login,
  profile,
  lecturerProfile,
  lecturerLogin,
} from './src/controller/auth';
import {getCredentials} from './src/helpers/app-persistent';
import Snackbar from 'react-native-snackbar';
import {LoadingScreen} from './src/views';
const darkTheme = {...dark, ...customDarkTheme};
const lightTheme = {...light, ...customLightTheme};
import {useSelector} from 'react-redux';
import {saveUser, saveUserToken} from './src/store/action';

const App = (props) => {
  const [loading, setLoading] = useState(false);
  const {isDark} = useSelector((state) => state.app_store);

  const handleStudentLogin = (values) => {
    setLoading(true);
    login({matric_no: values.uid, password: values.password})
      .then((data) => {
        const token = data;

        saveUserToken(token);
        profile(token)
          .then((res) => {
            const authUser = {
              name: res.fullname,
              role: 'student',
              ...res,
            };
            saveUser(authUser);
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
            setLoading(false);
          });
      })
      .catch((error) => {
        Snackbar.show({
          text: error.toUpperCase,
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

    lecturerLogin({email: values.uid, password: values.password})
      .then((data) => {
        const token = data;
        saveUserToken(token);
        lecturerProfile(token)
          .then(({user}) => {
            const authUser = {
              id: user.id,
              matric_no: user.staff_no,
              name: user.fullname,
              ...user,
              role: 'lecturer',
            };
            saveUser(authUser);
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
  useEffect(() => {
    /* getCredentials()
      .then((credentials) => {
        if (credentials.role === 'student') {
          handleStudentLogin(credentials);
        } else if (credentials.role === 'lecturer') {
          handleLecturerLogin(credentials);
        }
      })
      .catch((e) => {
        console.log(e);
      }); */
    changeNavigationBarColor('#00AB4A', false, true);
  }, []);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        mapping={mapping}
        theme={isDark ? darkTheme : lightTheme}
        customMapping={customMapping}>
        <StatusBar backgroundColor="#00AB4A" />
        {loading ? <LoadingScreen /> : <AppNavigator />}
      </ApplicationProvider>
    </>
  );
};

export default App;
