import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import FormBody from './FormBody';
import {Input, Icon, Button, Select, Text} from '@ui-kitten/components';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Formik} from 'formik';
import {registerSchema} from '../helpers/validator';
import {register} from '../controller/auth';
import Snackbar from 'react-native-snackbar';
import {useNavigation} from '@react-navigation/native';

const StudentForm = () => {
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

  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIconEye = (style) => (
    <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'} />
  );

  const handleRegister = (values) => {
    const user = {...values, level: level.text};
    setLoading(true);

    register(user)
      .then((data) => {
        setLoading(false);
        Snackbar.show({
          text: `Registration Successful, Login Now`,
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
        navigate('signin');
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

export default StudentForm;
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
