import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
  Modal,
} from 'react-native';
import {
  Icon,
  Text,
  TopNavigationAction,
  Button,
  Avatar,
  Layout,
  useTheme,
} from '@ui-kitten/components';
import {Container, Navbar} from '../components';
import {inject, observer} from 'mobx-react';
import avatar from '../assets/img/user.png';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import * as ImagePicker from 'react-native-image-picker';
import {uploadStudentDp} from '../controller/auth';

const BackIcon = (style) => <Icon {...style} name="arrow-back" fill="white" />;

const SettingsScreen = ({navigation, store}) => {
  const navigateBack = () => {
    navigation.goBack();
  };
  const theme = useTheme();
  const [imgUrl, setImgUrl] = useState(null);
  const [visible, setVisible] = useState(false);

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const {toggleTheme, myTheme, userToken} = store;

  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      {mediaType: 'photo', includeBase64: false, maxHeight: 200, maxWidth: 200},
      (res) => {
        setImgUrl(res.uri);
      },
    );
  };

  const saveDp = () => {
    console.log(uploadStudentDp(res.uri, userToken));
  };

  return (
    <>
      <Navbar
        title="Settings"
        leftAction={<BackAction />}
        textStyle={styles.title}
      />
      <Container customStyle={styles.container}>
        <Layout style={styles.imagePicker}>
          <TouchableWithoutFeedback onPress={() => setVisible(true)}>
            <Avatar
              style={styles.avatar}
              size="large"
              source={imgUrl ? {uri: imgUrl} : avatar}
            />
          </TouchableWithoutFeedback>
          <View style={styles.pickerContainer}>
            <TouchableWithoutFeedback onPress={() => pickImage()}>
              <Icon
                name="camera"
                style={styles.pickerIcon}
                fill={theme['color-primary-default']}
              />
            </TouchableWithoutFeedback>
          </View>
        </Layout>
        <Button onPress={() => toggleTheme(myTheme)}>Change Theme</Button>
        <Button onPress={()=>saveDp()}>Upload</Button>
        <Modal
          visible={visible}
          transparent={false}
          animationType="slide"
          onRequestClose={() => setVisible(false)}>
          <View style={styles.backdrop}>
            <Image style={styles.preview} source={{uri: imgUrl}} />
          </View>
        </Modal>
      </Container>
    </>
  );
};

export default inject('store')(observer(SettingsScreen));
const styles = StyleSheet.create({
  title: {
    color: 'white',
  },
  container: {},
  imagePicker: {
    height: hp(23),
    marginVertical: 20,
    position: 'relative',
  },
  avatar: {
    width: wp(40),
    height: hp(22),
    alignSelf: 'center',
  },
  pickerIcon: {
    width: 50,
    height: 50,
  },
  pickerContainer: {
    position: 'absolute',
    top: '65%',
    right: '30%',
  },
  preview: {
    resizeMode: 'contain',
    width: '90%',
    alignSelf: 'center',
  },
  backdrop: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
