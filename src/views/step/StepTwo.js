import React from 'react';
import {StyleService, useStyleSheet, Text, Button} from '@ui-kitten/components';
import {Container} from '../../components';
import {inject, observer} from 'mobx-react';

const StepTwo = (props) => {
  const styles = useStyleSheet(themedStyles);
  const checkLocation = () => {
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
          Nice! <Text style={{fontSize: 16}}>We need your location.</Text>
        </Text>
        <Text appearance="hint" style={{fontSize: 12.5}}>
          to ensure you're reaaly in class kindly activate location setting to
          be sure you're within 30 meters of the Lecturer
        </Text>
      </Container>
      <Container customStyle={styles.form}>
        <Button onPress={checkLocation}>Next</Button>
      </Container>
    </>
  );
};

// export default inject('themeStore')(observer(StepTwo));
export default StepTwo;
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
