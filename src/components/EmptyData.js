import React from 'react';
import {
  Text,
  Icon,
  Layout,
  StyleService,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const EmptyData = ({info}) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

  return (
    <Layout style={styles.layout}>
      <Icon
        name="archive-outline"
        fill={theme['color-basic-500']}
        style={styles.icon}
      />
      <Text style={styles.info}>{info}</Text>
    </Layout>
  );
};

export default EmptyData;
const themedStyles = StyleService.create({
  layout: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    width: wp(10),
    height: hp(10),
  },
  info: {textAlign: 'center', fontSize: hp(2)},
});
