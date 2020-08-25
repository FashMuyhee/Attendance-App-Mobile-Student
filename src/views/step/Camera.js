/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  StyleService,
  useStyleSheet,
  Text,
  Button,
  Icon,
  useTheme,
} from '@ui-kitten/components';
import { Image } from 'react-native';
import { Container, ModalAlert } from '../../components';
import ImagePicker from 'react-native-image-picker';
import { inject, observer } from 'mobx-react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View } from 'react-native';
import axios from 'axios';
const Camera = (props) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const [state, setState] = useState({
    visible: false,
    imgUri: null,
    error: null,
    loading: false,
  });

  const submit = () => {
    // mathc image
    /* axios({
      method: 'get',
      url: 'https://api.pixlab.io/facecompare',
      params: {
        src: imgUri,
        target: target,
        key: 'My_Pix_Key',
      }
    }).then(data => {
      console.log(data.same_face, data.confidence)
      // submit attendance if face match
    }).catch(error => {
      console.log(error)
    }) */
    setState({ ...state, visible: true });
  };
  const checkSignInCode = () => {
    const { next, saveState } = props;
    // Save state for use in other steps
    saveState({ name: 'samad' });
    next();
  };

  const launchCamera = () => {
    let options = {
      cameraRoll: false,
      /* storageOptions: {
        // skipBackup: true,
        // path: 'images',
      }, */
    };
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setState({ ...state, imgUri: response.uri });
        // check for facial match
      }
    });
  };
  const { imgUri, visible } = state;
  const RenderImage = () => {
    if (imgUri) {
      return <Image source={{ uri: imgUri }} style={styles.image} />;
    } else {
      return (
        <>
          <Icon
            name="camera"
            style={styles.icon}
            fill={theme['color-primary-default']}
            onPress={launchCamera}
          />
          <Text
            appearance="hint"
            style={{ ...styles.subtitleText, textAlign: 'center' }}>
            Click to take a front facing picture of yourself
          </Text>
        </>
      );
    }
  };
  return (
    <>
      <Container customStyle={styles.welcomeNote}>
        <Text style={styles.boldText}>
          Super! <Text style={styles.normalText}>Just a Picture</Text>
        </Text>
        <Text appearance="hint" style={styles.subtitleText}>
          All that's left is just a picture, provide a selfie image of yourself
          and you're good to go
        </Text>
      </Container>
      <Container customStyle={styles.imageContainer}>
        <View style={styles.camera}>
          <RenderImage />
        </View>
        <Text appearance="hint" style={styles.subtitleText}>
          {imgUri
            ? 'Good! Now we need to comfirm if it is really you'
            : 'Waiting for you to take picture'}
        </Text>
        {imgUri ? (
          <Button onPress={launchCamera} style={styles.btn} status="success">
            Retake Image
          </Button>
        ) : null}
        <Button onPress={submit} style={styles.btn}>
          Done
        </Button>
      </Container>
      <ModalAlert
        isVisible={visible}
        closeModal={() => setState({ ...state, visible: false })}
        message="You've signed in for Compiler Construction successfully"
        subtitle="Ensure that you signout when the class is over, so your attendance is marked"
        btnText="Go Home"
      />
    </>
  );
};

// export default inject('store')(observer(StepTwo));
export default Camera;
const themedStyles = StyleService.create({
  welcomeNote: {
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
  imageContainer: {
    display: 'flex',
    /* borderColor: 'yellow',
    borderWidth: 1, */
    paddingLeft: '9%',
    paddingRight: '9%',
    marginTop: hp('2%'),
    height: hp('70%'),
    alignItems: 'center',
  },
  camera: {
    display: 'flex',
    borderColor: 'color-primary-200',
    borderWidth: 1,
    borderRadius: 10,
    width: wp('80%'),
    height: hp('40%'),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: hp('4%'),
  },
  icon: {
    width: wp('20%'),
    height: hp('20%'),
  },
  image: {
    width: wp('80%'),
    height: hp('40%'),
    borderRadius: 10,
  },
  btn: {
    width: '100%',
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
  },
});
