import React, {PureComponent} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text, Button, Icon} from '@ui-kitten/components';
import {
  Container,
  ModalAlert,
  CameraModal,
  MyText,
  WelcomeNote,
} from '../../components';
import ImagePicker from 'react-native-image-picker';
import {inject, observer} from 'mobx-react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import axios from 'axios';
import {RNCamera} from 'react-native-camera';
import {TakeScreen} from '../student';

class Camera extends PureComponent {
  state = {
    visible: false,
    imgUri: null,
    error: null,
    loading: false,
    cameraVisible: false,
  };

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 1, base64: true};
      await this.camera.resumePreview();
      const data = await this.camera.takePictureAsync(options);
      //send captured image for comparison
      this.setState({imgUri: data.uri});
    }
  };
  onFaceDetect = async ({faces}) => {
    if (faces[0]) {
      await this.takePicture();
      this.setState({cameraVisible: false});
    }
  };

  handleCameraModal = () => {
    const {cameraVisible} = this.state;
    if (cameraVisible) {
      this.setState({cameraVisible: false});
    } else {
      this.setState({cameraVisible: true});
    }
  };
  finish = () => {
    this.props.navigation.navigate('home');
  };

  RenderImage = () => {
    if (this.state.imgUri) {
      return <Image source={{uri: this.state.imgUri}} style={styles.image} />;
    } else {
      return (
        <>
          <Icon
            name="camera"
            style={styles.icon}
            fill="#00BA4A"
            onPress={this.handleCameraModal}
          />
          <MyText
            appearance="hint"
            style={{...styles.subtitleText, textAlign: 'center'}}>
            Click to take a front facing picture of yourself
          </MyText>
        </>
      );
    }
  };

  render() {
    const {imgUri, visible, cameraVisible} = this.state;
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
            <this.RenderImage />
          </View>
          <Text appearance="hint" style={styles.subtitleText}>
            {imgUri
              ? 'Good! Now we need to comfirm if it is really you'
              : 'Waiting for you to take picture'}
          </Text>
          {imgUri ? (
            <Button
              onPress={this.handleCameraModal}
              style={styles.btn}
              status="success">
              Retake Image
            </Button>
          ) : null}
          <Button onPress={this.finish} style={styles.btn}>
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
        <CameraModal
          isVisible={cameraVisible}
          closeModal={this.handleCameraModal}>
          <RNCamera
            ref={(ref) => {
              this.camera = ref;
            }}
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
            onFacesDetected={this.onFaceDetect}
          />
        </CameraModal>
      </TakeScreen>
    );
  }
}

export default Camera;
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
