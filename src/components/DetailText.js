import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@ui-kitten/components';

const DetailText = ({title, subtitle}) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>{title}</Text> */}
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default DetailText;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '97%',
    paddingTop: '1%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  title: {
    width: '35%',
    fontWeight: 'bold',
    /*  borderColor: 'red',
    borderWidth: 1, */
  },
  subtitle: {
    // width: '62%',
    fontWeight: '200',
    /*  borderColor: 'red',
    borderWidth: 1, */
  },
});
