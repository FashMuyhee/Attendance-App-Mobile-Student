import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {
  StyleService,
  useStyleSheet,
  useTheme,
  Icon,
  Text,
} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

const Box = ({icon, title, route}) => {
  const navigation = useNavigation();

  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const pulseIconRef = React.useRef();
  const handleClick = () => {
    pulseIconRef.current.startAnimation();
    navigation.navigate(route);
  };
  return (
    <TouchableOpacity onPress={handleClick}>
      <View style={styles.box}>
        <Icon
          style={styles.icon}
          name={icon}
          fill={theme['color-primary-default']}
          ref={pulseIconRef}
          animation="pulse"
        />
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Box;
const themedStyles = StyleService.create({
  box: {
    height: 120,
    width: 120,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'color-primary-default',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 8,
    marginRight: '5%',
    marginLeft: '5%',
    marginBottom: '7%',
  },
  icon: {
    width: 50,
    height: 50,
  },
  text: {
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
