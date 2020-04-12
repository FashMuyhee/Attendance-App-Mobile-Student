import React from 'react';
import {StyleSheet} from 'react-native';
import FormBody from './FormBody';
import {Input, Icon, Button, Select} from '@ui-kitten/components';

const StudentForm = () => {
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
        placeholder="Matric No"
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
      <Button>Sign Up</Button>
    </FormBody>
  );
};

export default StudentForm;
const styles = StyleSheet.create({
  form: {
    marginTop: '0%',
    paddingLeft: '0%',
    paddingRight: '0%',
    /* borderColor: 'black',
    borderWidth: 1, */
  },
  input: {
    marginBottom: '4%',
  },
});
