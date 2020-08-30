import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import {
  StyleService,
  useStyleSheet,
  useTheme,
  Icon,
  Text,
  Button,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MyText from './MyText';

const Box = ({ icon, title, route, xtraOnPress }) => {
  const navigation = useNavigation();

  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const handleRoute = () => {
    navigation.navigate(route);
  };
  const handleClick = route ? handleRoute : xtraOnPress
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <View style={styles.box}>
        <Icon
          style={styles.icon}
          name={icon}
          fill={theme['color-primary-default']}
          onPress={handleClick}
        />
        <MyText customStyle={styles.text}>{title}</MyText>
      </View>
    </TouchableWithoutFeedback >
  );
};

export default Box;
const themedStyles = StyleService.create({
  box: {
    height: hp('22%'),
    width: wp('40%'),
    borderRadius: 20,
    backgroundColor: 'background-basic-color-1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'background-basic-color-4',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 8,
    // marginRight: wp('1.5%'),
    // marginLeft: wp('1.5%'),
    marginBottom: hp('3%'),
  },
  icon: {
    width: wp('13%'),
    height: hp('13%'),
  },
  text: {
    textTransform: 'capitalize',
    textAlign: 'center',
    fontSize: 23
  },
});
