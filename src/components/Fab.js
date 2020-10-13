import React from 'react';
import {TouchableWithoutFeedback, Text, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
  useTheme,
} from '@ui-kitten/components';

const Fab = ({children, onPress}) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Layout style={styles.fab}>
        <Icon
          style={styles.icon}
          name="plus"
          fill={theme['color-basic-700']}
        />
      </Layout>
    </TouchableWithoutFeedback>
  );
};

export default Fab;
const themedStyles = StyleService.create({
  fab: {
    backgroundColor: 'color-success-default',
    color: 'color-text',
    textAlign: 'center',
    position: 'absolute',
    bottom: hp('5%'),
    right: wp('2%'),
    width: 55,
    height: 55,
    borderRadius: 50,
  },
  icon: {
    fontSize: 8,
  },
});
