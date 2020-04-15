import React from 'react';
import {
  TopNavigationAction,
  StyleService,
  useStyleSheet,
  Icon,
} from '@ui-kitten/components';
import {Navbar, ScrollContainer} from '../components';
import {inject, observer} from 'mobx-react';
import AnimatedMultistep from 'react-native-animated-multistep';
import {StepOne, StepTwo, StepThree} from './step';
const TakeScreen = (props) => {
  const styles = useStyleSheet(themedStyles);
  const BackIcon = (style) => (
    <Icon {...style} fill="white" name="arrow-back" />
  );
  const allSteps = [
    {name: 'step 1', component: StepOne},
    {name: 'step 2', component: StepTwo},
    {name: 'step 3', component: StepThree},
  ];
  const onNext = () => {
    console.log('Next');
  };

  const onBack = () => {
    console.log('Back');
  };

  const finish = (finalState) => {
    console.log(finalState);
  };
  return (
    <ScrollContainer customStyle={styles.dashboard}>
      <Navbar
        title="Take Attendance"
        textStyle={styles.title}
        leftAction={
          <TopNavigationAction
            icon={BackIcon}
            onPress={() => props.navigation.goBack()}
          />
        }
      />
      <AnimatedMultistep
        steps={allSteps}
        onFinish={finish}
        onBack={onBack}
        onNext={onNext}
        comeInOnNext="bounceInUp"
        OutOnNext="bounceOutUp"
      />
    </ScrollContainer>
  );
};

export default inject('themeStore')(observer(TakeScreen));
const themedStyles = StyleService.create({
  dashboard: {
    height: '100%',
    width: '100%',
    position: 'relative',
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: 'color-basic-100',
  },
  navBar: {
    backgroundColor: 'color-primary-default',
    color: 'white',
  },
  title: {
    color: 'white',
  },
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
