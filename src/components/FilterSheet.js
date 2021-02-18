import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import filter from '../assets/img/filter.png';
import {Text} from '@ui-kitten/components';

const FilterSheet = ({sheet}) => {
  return (
    <ActionSheet
      ref={sheet}
      statusBarTranslucent
      bounceOnOpen
      bounciness={4}
      gestureEnabled
      containerStyle={styles.actionsContainer}
      closable>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
        Filter your Attendance Record
      </Text>
      <View style={styles.actionsItem}>
        <Image source={filter} />
        <Text style={{fontSize: 17}}>Sort by Course Code</Text>
      </View>
    </ActionSheet>
  );
};

export default FilterSheet;

const styles = StyleSheet.create({
  actionsContainer: {
    height: 250,
    paddingHorizontal: 40,
    alignItems: 'flex-start',
    paddingTop: 10,
  },
  actionsItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // borderWidth: StyleSheet.hairlineWidth,
    height: 50,
    paddingHorizontal: 10,
    width: '55%',
  },
});
