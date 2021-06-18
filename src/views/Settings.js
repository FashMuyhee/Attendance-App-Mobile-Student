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
  Toggle,
} from '@ui-kitten/components';
import {Container, Navbar} from '../components';
import avatar from '../assets/img/user.png';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import * as ImagePicker from 'react-native-image-picker';
import {uploadStudentDp} from '../controller/auth';
import Snackbar from 'react-native-snackbar';
import {useDispatch, useSelector} from 'react-redux';
import {switchSystemTheme, toggleTheme} from '../store/action';

const SettingsScreen = ({navigation}) => {
  const navigateBack = () => {
    navigation.goBack();
  };
  const theme = useTheme();
  const [imgUrl, setImgUrl] = useState({uri: null});
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {isDark, user, isSystemTheme} = useSelector((state) => state.app_store);
  const BackIcon = (style) => (
    <Icon {...style} name="arrow-back" fill="white" />
  );
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const ThemeIcon = () => (
    <Icon
      width={32}
      height={32}
      name={isDark ? 'moon' : 'sun'}
      fill={isDark ? theme['color-info-200'] : theme['color-success-default']}
    />
  );

  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      {mediaType: 'photo', includeBase64: false},
      (res) => {
        setImgUrl(res);
      },
    );
  };

  const saveDp = async () => {
    setLoading(true);
    const result = await uploadStudentDp(imgUrl, user.role);
    console.log(result);
    const colorCode = result.type === 'error' ? 'red' : 'green';
    if (result.type != 'error') {
      setUser({...user, dp: result.imageUpload.data});
    }
    setLoading(false);
    Snackbar.show({
      text: result.message.toUpperCase(),
      duration: Snackbar.LENGTH_SHORT,
      textColor: colorCode,
      action: {
        text: 'ok',
        textColor: colorCode,
        onPress: () => {
          Snackbar.dismiss();
        },
      },
    });
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleUseSystemTheme = () => {
    dispatch(switchSystemTheme());
  };

  const image =
    user.dp === null && imgUrl.uri === null
      ? avatar
      : imgUrl.uri != null
      ? {uri: imgUrl.uri}
      : {uri: user.dp};

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
              // source={imgUrl.uri != null ? {uri: imgUrl.uri} : avatar}
              source={image}
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
        {typeof user.dp === 'object' ? (
          <Button
            onPress={() => saveDp()}
            disabled={loading}
            style={{marginVertical: 10, width: '70%', alignSelf: 'center'}}>
            {loading ? ' Uploading ....' : 'Upload'}
          </Button>
        ) : (
          <></>
        )}
        <View style={styles.themeToggle}>
          <Text>Use System Theme</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Toggle
              status="primary"
              checked={isSystemTheme}
              onChange={handleUseSystemTheme}
            />
          </View>
        </View>
        <View style={styles.themeToggle}>
          <Text>Theme</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Toggle
              status="primary"
              checked={isDark}
              onChange={handleThemeToggle}
              disabled={isSystemTheme}
            />
            <ThemeIcon />
          </View>
        </View>
        <Modal
          visible={visible}
          transparent={false}
          animationType="slide"
          onRequestClose={() => setVisible(false)}>
          <View style={styles.backdrop}>
            <Image
              source={{uri: user.dp}}
              style={styles.preview}
              // source={imgUrl.uri != null ? {uri: imgUrl.uri} : avatar}
            />
          </View>
        </Modal>
      </Container>
    </>
  );
};

export default SettingsScreen;
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
    width: wp(45),
    height: hp(23),
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
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
});
