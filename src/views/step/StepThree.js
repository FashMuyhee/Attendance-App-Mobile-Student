import React from 'react';
import {StyleService, useStyleSheet, Text, Button} from '@ui-kitten/components';
import {Container} from '../../components';
import {inject, observer} from 'mobx-react';

const StepThree = (props) => {
  const styles = useStyleSheet(themedStyles);
  const checkSignInCode = () => {
    const {next, saveState} = props;
    // Save state for use in other steps
    saveState({name: 'samad'});
    next();
  };

  const goBack = () => {
    const {back} = props;
    console.log('from step2');

    back();
  };

  return (
    <>
      <Container customStyle={styles.welcomeNote}>
        <Text style={styles.boldText}>
          Super! <Text style={{fontSize: 16}}>Just a Picture</Text>
        </Text>
        <Text appearance="hint" style={{fontSize: 12.5}}>
          All that's left is just a picture, provide a selfie image of yourself
          and you're good to go
        </Text>
      </Container>
      <Container customStyle={styles.form}>
        <Button onPress={goBack}>Back</Button>
      </Container>
    </>
  );
};

// export default inject('themeStore')(observer(StepTwo));
export default StepThree;
const themedStyles = StyleService.create({
  welcomeNote: {
    /*  borderColor: 'yellow',
    borderWidth: 1, */
    marginTop: '15%',
    paddingLeft: '9%',
    paddingRight: '9%',
    height: '40%',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  form: {
    paddingLeft: '9%',
    paddingRight: '9%',
    marginTop: '10%',
  },
  tabContainer: {
    justifyContent: 'center',
    marginTop: '10%',
  },
  input: {
    marginBottom: '4%',
  },
});
