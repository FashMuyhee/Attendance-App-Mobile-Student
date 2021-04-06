import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import FormBody from './FormBody';
import {Input, Icon, Button, Select, Text} from '@ui-kitten/components';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Formik} from 'formik';
import {registerSchema} from '../helpers/validator';
import {register, login, profile} from '../controller/auth';
import Snackbar from 'react-native-snackbar';
import {useNavigation} from '@react-navigation/native';
import {inject, observer} from 'mobx-react';

const StudentForm = ({store}) => {
  const data = [
    {text: 'ND1'},
    {text: 'ND2'},
    {text: 'ND3'},
    {text: 'HND1'},
    {text: 'HND2'},
    {text: 'HND3'},
  ];

  const {navigate} = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [level, setLevel] = React.useState({text: ''});
  const [loading, setLoading] = useState(false);

  const {setIsLoggedIn, setUser, setToken} = store;

  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIconEye = (style) => (
    <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'} />
  );

  const handleRegister = (values) => {
    const user = {...values, level: level.text};
    setLoading(true);

    if(values.c_password === values.password){
      register(user)
      .then(() => {
        const user = {matric_no: values.matric_no, password: values.password};
        login(user)
          .then((data) => {
            const token = data;

            setToken(token);
            console.log(token);
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
                  text: `Registration Successful, Welcome ${res.fullname}`,
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
    }else{
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
        matric_no: '',
        fullname: '',
        department: '',
        level: level.text,
        c_password: '',
      }}
      onSubmit={handleRegister}
      validationSchema={registerSchema}>
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
            placeholder="Matric No"
            onChangeText={handleChange('matric_no')}
            style={styles.input}
            returnKeyType="next"
          />
          {errors.matric_no && touched.matric_no && (
            <Text style={styles.errorText}>{errors.matric_no}</Text>
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
            data={data}
            selectedOption={level}
            onSelect={setLevel}
            style={styles.input}
            placeholder="Level"
          />
          {errors.level && touched.level && (
            <Text style={styles.errorText}>{errors.level}</Text>
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

export default inject('store')(observer(StudentForm));
const styles = StyleSheet.create({
  form: {
    marginTop: '6%',
    paddingLeft: '0%',
    paddingRight: '0%',
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
