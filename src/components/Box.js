import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {
  StyleService,
  useStyleSheet,
  useTheme,
  Icon,
  Text,
  Button,
} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Box = ({icon, title, route}) => {
  const navigation = useNavigation();

  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const handleClick = () => {
    navigation.navigate(route);
  };
  return (
    // <TouchableOpacity onPress={handleClick}>
    // <Button
    //   onPress={handleClick}
    //   appearance="ghost"
    //   style={{borderColor: 'red', borderWidth: 1}}>
    <View style={styles.box}>
      <Icon
        style={styles.icon}
        name={icon}
        fill={theme['color-primary-default']}
        onPress={handleClick}
      />
      <Text style={styles.text}>{title}</Text>
    </View>
    //  </TouchableOpacity>
    // </Button>
  );
};

export default Box;
const themedStyles = StyleService.create({
  box: {
    height: hp('22%'),
    width: wp('32%'),
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
    marginRight: wp('4%'),
    marginLeft: wp('4%'),
    marginBottom: hp('3%'),
  },
  icon: {
    width: wp('10%'),
    height: hp('10%'),
  },
  text: {
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
