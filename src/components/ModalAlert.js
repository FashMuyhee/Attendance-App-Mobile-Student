import React from 'react';
import {Modal, View, Image} from 'react-native';
import {
  StyleService,
  useStyleSheet,
  Text,
  Button,
  Layout,
} from '@ui-kitten/components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage as fontSize} from 'react-native-responsive-fontsize';
import confeti from '../assets/img/confeti.png';
import sad from '../assets/img/sad.png';

const ModalAlert = ({
  isVisible,
  closeModal,
  warn,
  btnText,
  message,
  subtitle,
}) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Modal
      style={styles.modal}
      transparent
      visible={isVisible}
      animationType="slide">
      <Layout style={styles.wrapper}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            {warn ? (
              <Image source={sad} style={styles.icon} />
            ) : (
              <Image source={confeti} style={styles.icon} />
            )}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.boldText}>{message}</Text>
            {warn ? null : (
              <Text appearance="hint" style={styles.subtitleText}>
                {subtitle}
              </Text>
            )}
          </View>
          <Button style={styles.btn} onPress={closeModal}>
            {btnText}
          </Button>
        </View>
      </Layout>
    </Modal>
  );
};

export default ModalAlert;

const themedStyles = StyleService.create({
  wrapper: {
    width: wp('100%'),
    height: hp('100%'),
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.4)',
    justifyContent: 'center',
  },
  content: {
    width: wp('90%'),
    height: hp('50%'),
    backgroundColor: 'background-basic-color-1',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: 'color-basic-100',
    height: hp('20%'),
    width: wp('40%'),
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  icon: {
    resizeMode: 'center',
    width: wp(40),
    height: hp(50),
  },
  textContainer: {
    textAlign: 'center',
    width: wp('80%'),
  },
  boldText: {
    textAlign: 'center',
    fontSize: fontSize(2),
    paddingVertical: hp('2%'),
    fontFamily: 'Poppins-Bold',
    letterSpacing: 2,
    flexWrap: 'wrap',
  },
  subtitleText: {
    textAlign: 'center',
    fontSize: fontSize(1.9),
    paddingVertical: hp('3%'),
    fontFamily: 'Poppins-Medium',
  },
  btn: {
    width: '60%',
    marginVertical: 20,
  },
});
