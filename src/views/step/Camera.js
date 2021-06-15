import React, {useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text, Button, Icon} from '@ui-kitten/components';
import {
  Container,
  ModalAlert,
  CameraModal,
  MyText,
  WelcomeNote,
} from '../../components';
import {inject, observer} from 'mobx-react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RNCamera} from 'react-native-camera';
import {TakeScreen} from '../student';
import {markAttendance, compareImageDp} from '../../controller/attendance';
import {useCamera} from 'react-native-camera-hooks';
import * as ImagePicker from 'react-native-image-picker';

const Camera = ({route, store}) => {
  const [{cameraRef}, {takePicture: takePictureAsync}] = useCamera();
  const [base64Img, setBase64Img] = useState('');
  const [imgUri, setImgUri] = useState('');
  const [state, setState] = useState({
    visible: false,
    imgUri: null,
    error: null,
    loading: false,
    cameraVisible: false,
  });
  const routeParam = route.params;

  const takePicture = async () => {
    const options = {base64: true, quality: 0.5};
    const data = await takePictureAsync(options);
    setState({...state, cameraVisible: false});
    setBase64Img(data.base64);
    setImgUri(data);
  };

  const onFaceDetect = async ({faces}) => {
    if (faces[0]) {
      await takePicture();
      setState({...state, cameraVisible: false});
    }
  };

  const handleCameraModal = async () => {
    const {cameraVisible} = state;
    if (cameraVisible) {
      setState({...state, cameraVisible: false});
    } else {
      setState({...state, cameraVisible: true});
    }
  };

  const finish = async () => {
    const {location, code} = routeParam;
    setState({...state, loading: true});

    compareImageDp(imgUri, store.user.dp)
      .then(async (data) => {
        setState({...state, loading: false});
        if (data.confidence > 75) {
          try {
            const data = await markAttendance({
              body: {gps: location},
              code,
              token: store.userToken,
            });
            console.log(data.data);
          } catch (error) {
            console.log(error);
          }
        }
      })
      .catch((e) => {
        console.log(e);
        setState({...state, loading: false});
      });
  };

  const RenderImage = () => {
    if (imgUri) {
      return <Image source={{uri: imgUri?.uri}} style={styles.image} />;
    } else {
      return (
        <>
          <Icon
            name="camera"
            style={styles.icon}
            fill="#00BA4A"
            onPress={handleCameraModal}
          />
          <MyText
            appearance="hint"
            customStyle={[styles.subtitleText, {textAlign: 'center'}]}>
            Click to take a front facing picture of yourself
          </MyText>
        </>
      );
    }
  };

  const {visible, cameraVisible} = state;
  return (
    <TakeScreen>
      <WelcomeNote
        bold="Super"
        normal="Just a Picture"
        subtitle="All that's left is just a picture, provide a selfie image of
          yourself and you're good to go"
      />
      <Container customStyle={styles.imageContainer}>
        <View style={styles.camera}>
          <RenderImage />
        </View>
        <Text appearance="hint" style={styles.subtitleText}>
          {imgUri
            ? 'Good! Now we need to confirm if it is really you'
            : 'Waiting for you to take picture'}
        </Text>
        {imgUri ? (
          <Button
            onPress={handleCameraModal}
            style={styles.btn}
            status="success"
            disabled={state.loading}>
            Retake Image
          </Button>
        ) : null}
        <Button onPress={finish} style={styles.btn} disabled={state.loading}>
          Done
        </Button>
      </Container>
      <ModalAlert
        isVisible={visible}
        closeModal={() => setState({...state, visible: false})}
        message="You've signed in for Compiler Construction successfully"
        subtitle="Ensure that you signout when the class is over, so your attendance is marked"
        btnText="Go Home"
      />
      <CameraModal isVisible={cameraVisible} closeModal={handleCameraModal}>
        <RNCamera
          ref={cameraRef}
          captureAudio={false}
          style={StyleSheet.absoluteFill}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          faceDetectionClassification={
            RNCamera.Constants.FaceDetection.Classifications.all
          }
          faceDetectionLandmarks={
            RNCamera.Constants.FaceDetection.Landmarks.all
          }
          onFacesDetected={onFaceDetect}
        />
      </CameraModal>
    </TakeScreen>
  );
};

export default inject('store')(observer(Camera));
const styles = StyleSheet.create({
  /*  welcomeNote: {
    marginTop: hp('5%'),
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
  }, */
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
    borderColor: '#94F89E',
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
