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
import {login, profile} from './src/controller/auth';
import {getCredentials} from './src/helpers/app-persistent';
import SplashScreen from 'react-native-splash-screen';
import Snackbar from 'react-native-snackbar';

const darkTheme = {...dark, ...customDarkTheme};
const lightTheme = {...light, ...customLightTheme};

const App = (props) => {
  /* const [theme, setTheme] = useState('');
  const getTheme = async () => {
    try {
      const mytheme = await AsyncStorage.getItem('theme');
      setTheme(mytheme);
    } catch (error) {
      console.error(error);
    }
  };
*/
  const [loading, setLoading] = useState(false);
  const {setIsLoggedIn, setUser, setToken, myTheme} = props.store;

  const handleStudentLogin = (values) => {
    setLoading(true);
    login({matric_no: values.uid, password: values.password})
      .then((data) => {
        const token = data;

        setToken(token);
        profile(token)
          .then((res) => {
            const authUser = {
              name: res.fullname,
              role: 'student',
              ...res,
            };
            setUser(authUser);
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

  useEffect(() => {
    getCredentials()
      .then((credentials) => {
        if (credentials.role === 'student') {
          handleStudentLogin(credentials);
        } else if (credentials.role === 'lecturer') {
          console.log('yeah lecturer');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  let currentTheme = lightTheme;
  if (myTheme === 'lightTheme') {
    currentTheme = lightTheme;
  } else if (myTheme === 'darkTheme') {
    currentTheme = darkTheme;
  }
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        mapping={mapping}
        theme={currentTheme}
        customMapping={customMapping}>
        <StatusBar backgroundColor="#00AB4A" />
        <AppNavigator />
      </ApplicationProvider>
    </>
  );
};

export default inject('store')(observer(App));
