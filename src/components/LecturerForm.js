import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import FormBody from './FormBody';
import {Input, Icon, Button, Select, Text} from '@ui-kitten/components';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {lecturerRegisterSchema} from '../helpers/validator';
import {
  lecturerRegister,
  lecturerLogin,
  lecturerProfile,
} from '../controller/auth';
import Snackbar from 'react-native-snackbar';
import {Formik} from 'formik';
import {saveUser, saveUserToken} from '../store/action';
import {useDispatch} from 'react-redux';
import axios from 'axios';

const LecturerForm = ({store}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [level, setLevel] = useState({text: ''});
  const [levelData, setLevelData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let data = [];
    for (let index = 0; index <= 30; index++) {
      data.push({text: index});
    }
    setLevelData(data);
  }, []);

  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIconEye = (style) => (
    <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'} />
  );
  const handleRegister = (values) => {
    const user = {...values, level: level.text};
    setLoading(true);

    if (values.c_password === values.password) {
      lecturerRegister(user)
        .then(() => {
          const user = {email: values.email, password: values.password};
          lecturerLogin(user)
            .then((data) => {
              const token = data;
              dispatch(saveUserToken(token));
              axios.defaults.headers.common[
                'Authorization'
              ] = `Bearer ${token}`;
              lecturerProfile()
                .then(({user}) => {
                  const authUser = {
                    id: user.id,
                    matric_no: user.staff_no,
                    ...user,
                    role: 'lecturer',
                  };
                  dispatch(saveUser(authUser));
                  setLoading(false);

                  Snackbar.show({
                    text: `Registration Successful, Welcome ${user.fullname}`,
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
        })
        .catch((error) => {
          setLoading(false);
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
        });
    } else {
      setLoading(false);

      Snackbar.show({
        text: 'Password Mismatch',
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
    }
  };
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        staff_no: '',
        fullname: '',
        department: '',
        level: level.text,
        c_password: '',
      }}
      onSubmit={handleRegister}
      validationSchema={lecturerRegisterSchema}>
      {({handleChange, handleSubmit, errors, touched}) => (
        <FormBody customStyle={styles.form}>
          <Input
            placeholder="Fullname"
            onChangeText={handleChange('fullname')}
            style={styles.input}
            returnKeyType="next"
          />
          {errors.fullname && touched.fullname && (
            <Text style={styles.errorText}>{errors.fullname}</Text>
          )}
          <Input
            placeholder="Email"
            onChangeText={handleChange('email')}
            style={styles.input}
            keyboardType="email-address"
            returnKeyType="next"
          />
          {errors.email && touched.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
          <Input
            placeholder="Staff No"
            onChangeText={handleChange('staff_no')}
            style={styles.input}
            returnKeyType="next"
          />
          {errors.staff_no && touched.staff_no && (
            <Text style={styles.errorText}>{errors.staff_no}</Text>
          )}
          <Input
            placeholder="Department"
            onChangeText={handleChange('department')}
            style={styles.input}
            returnKeyType="next"
          />
          {errors.department && touched.department && (
            <Text style={styles.errorText}>{errors.department}</Text>
          )}
          <Select
            data={levelData}
            selectedOption={level}
            onSelect={setLevel}
            style={styles.input}
            placeholder="Level"
          />
          {level.text && level.text === '' ? (
            <Text style={styles.errorText}>kvbhb</Text>
          ) : (
            <></>
          )}
          <Input
            placeholder="Password"
            icon={renderIconEye}
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
          <Input
            placeholder="Confirm Password"
            icon={renderIconEye}
            secureTextEntry={secureTextEntry}
            onIconPress={onIconPress}
            onChangeText={handleChange('c_password')}
            style={styles.input}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />
          {errors.c_password && touched.c_password && (
            <Text style={styles.errorText}>{errors.c_password}</Text>
          )}
          <Button
            style={styles.button}
            onPress={handleSubmit}
            disabled={loading}>
            {loading ? 'Creating Profile ...' : ' Sign Up'}
          </Button>
        </FormBody>
      )}
    </Formik>
  );
};

export default LecturerForm;

const styles = StyleSheet.create({
  form: {
    paddingLeft: '0%',
    paddingRight: '0%',
    marginTop: '6%',
  },
  input: {
    marginBottom: hp('1.7%'),
  },
  button: {
    marginBottom: hp('4%'),
  },
  errorText: {
    color: 'tomato',
    fontSize: 12,
    marginBottom: 10,
  },
});
