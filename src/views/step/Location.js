import React from 'react';
import {StyleService, useStyleSheet, Text, Button} from '@ui-kitten/components';
import {Container} from '../../components';
import {inject, observer} from 'mobx-react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Location = (props) => {
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
          Nice! <Text style={styles.normalText}>We need your location.</Text>
        </Text>
        <Text appearance="hint" style={styles.subtitleText}>
          to ensure you're reaaly in class kindly activate location setting to
          be sure you're within 30 meters of the Lecturer
        </Text>
      </Container>
      <Container customStyle={styles.map}>
        <Button
          onPress={checkLocation}
          style={{bottom: 0, position: 'absolute', width: '100%'}}>
          Next
        </Button>
      </Container>
    </>
  );
};

// export default inject('themeStore')(observer(Location));
export default Location;
const themedStyles = StyleService.create({
  welcomeNote: {
    /*  borderColor: 'yellow',
    borderWidth: 1, */
    marginTop: hp('10%'),
    paddingLeft: '9%',
    paddingRight: '9%',
    height: hp('12%'),
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: hp('3%'),
  },
  normalText: {
    fontSize: hp('3%'),
  },
  subtitleText: {
    fontSize: hp('2%'),
  },
  map: {
    display: 'flex',
    borderColor: 'yellow',
    borderWidth: 1,
    paddingLeft: '9%',
    paddingRight: '9%',
    marginTop: hp('8%'),
    height: hp('40%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
