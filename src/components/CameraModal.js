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

const ModalAlert = ({isVisible, closeModal, children}) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

  return (
    <Modal
      style={styles.modal}
      transparent={false}
      visible={isVisible}
      animationType="slide">
      <Layout style={styles.content}>
        {children}

        <Icon
          name="arrow-back"
          style={styles.icon}
          fill="white"
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
    paddingLeft: wp('2%'),
    paddingTop: hp('2%'),
  },
  icon: {
    width: wp('10%'),
    height: hp('5%'),
  },
});
