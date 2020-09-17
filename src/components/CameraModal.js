import React from 'react';
import {Modal, View} from 'react-native';
import {
  StyleService,
  useStyleSheet,
  Text,
  Button,
  Layout,
  Icon,
  useTheme,
} from '@ui-kitten/components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ModalAlert = ({
  isVisible,
  closeModal,
 children
}) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

const CloseBtn= (style) => (
    <Icon {...style} fill="red" name="settings-outline"  onPress={closeModal}/>
  );

  return (
    <Modal
      style={styles.modal}
      transparent={false}
      visible={isVisible}
      animationType="slide">
      <Layout style={styles.content}>
        {children}

<Icon
              name="close"
              style={styles.icon}
              fill={theme['color-danger-300']}
              onPress={closeModal}
            />
      </Layout>
    </Modal>
  );
};

export default ModalAlert;
const themedStyles = StyleService.create({
  content: {
    width: wp('100%'),
    height: hp('100%'),
    paddingLeft: wp('10%'),
    paddingRight: wp('10%'),
    paddingTop: hp('20%'),
    display: 'flex',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: 'color-primary-default',
    height: hp('20%'),
    width: wp('35%'),
    borderRadius: 100,
  },
  iconWarnContainer: {
    // backgroundColor: 'color-danger-default',
    height: hp('20%'),
    width: wp('30%'),
    borderRadius: 100,
  },
  icon: {
    width: wp('25%'),
    height: hp('20%'),
    alignSelf: 'center',
  },
  textContainer: {
    textAlign: 'center',
    width: wp('50%'),
  },
  boldText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: hp('2.3%'),
    paddingTop: hp('10%'),
    paddingBottom: hp('5%'),
  },
  subtitleText: {
    textAlign: 'center',
    fontSize: hp('2%'),
    paddingBottom: hp('5%'),
  },
  btn: {
    width: '100%',
    marginTop: hp('4%'),
    marginBottom: hp('4%'),
  },
});
