import React from 'react';
import {StyleSheet} from 'react-native';
import FormBody from './FormBody';
import {Input, Icon, Button, Select} from '@ui-kitten/components';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const LecturerForm = () => {
  const data = [{text: 'Option 1'}, {text: 'Option 2'}, {text: 'Option 3'}];

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [selectedOption, setSelectedOption] = React.useState(null);

  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIconEye = (style) => (
    <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'} />
  );

  return (
    <FormBody customStyle={styles.form}>
      <Input
        // value={matric_no}
        placeholder="Fullname"
        // onChangeText={setMatricNo}
        style={styles.input}
      />
      <Input
        // value={matric_no}
        placeholder="Email"
        // onChangeText={setMatricNo}
        style={styles.input}
        keyboardType="email-address"
      />
      <Input
        // value={matric_no}
        placeholder="Staff No"
        // onChangeText={setMatricNo}
        style={styles.input}
      />
      <Input
        // value={matric_no}
        placeholder="Department"
        // onChangeText={setMatricNo}
        style={styles.input}
      />
      <Select
        data={data}
        selectedOption={selectedOption}
        onSelect={setSelectedOption}
        style={styles.input}
        placeholder="Level"
      />
      <Input
        // value={password}
        placeholder="Password"
        icon={renderIconEye}
        secureTextEntry={secureTextEntry}
        onIconPress={onIconPress}
        // onChangeText={setPassword}
        style={styles.input}
      />
      <Button style={styles.button}>Sign Up</Button>
    </FormBody>
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
    marginBottom: hp('2%'),
  },
  button: {
    marginBottom: hp('4%'),
  },
});
