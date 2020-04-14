import React from 'react';
import {StyleSheet} from 'react-native';
import {Hero, FormBody, ScrollContainer} from '../components';
import {Icon, Input, Button} from '@ui-kitten/components';
const SignInScreen = (props) => {
  const [matric_no, setMatricNo] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (style) => (
    <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'} />
  );
  const renderUserIcon = (style) => <Icon {...style} name="person-outline" />;
  return (
    <ScrollContainer>
      <Hero title="Welcome Back" subTitle="Provide login details to continue" />
      <FormBody customStyle={styles.formBody}>
        <Input
          value={matric_no}
          placeholder="Matric No"
          icon={renderUserIcon}
          onChangeText={setMatricNo}
          style={styles.input}
        />
        <Input
          value={password}
          placeholder="Password"
          icon={renderIcon}
          secureTextEntry={secureTextEntry}
          onIconPress={onIconPress}
          onChangeText={setPassword}
          style={styles.input}
        />
        <Button> Sign In</Button>

        <Button
          onPress={() => props.navigation.navigate('home')}
          appearance="ghost">
          home dashboard
        </Button>
      </FormBody>
    </ScrollContainer>
  );
};

export default SignInScreen;
const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
  formBody: {
    marginTop: '15%',
  },
});
