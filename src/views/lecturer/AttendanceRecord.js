import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  Icon,
  TopNavigationAction,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {ScrollContainer, Navbar, EmptyData} from '../../components';
import {Table, Row, Rows} from 'react-native-table-component';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const BackIcon = (style) => <Icon {...style} name="arrow-back" fill="white" />;

const AttendanceRecordScreen = ({navigation, route}) => {

  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  const records = route.params.attendance;
  const [tableTitle] = useState([
    'S/N',
    'Matric No',
    'date',
    'sign in',
    'sign out',
  ]);
  const styles = useStyleSheet(themeStyle);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Navbar
        title="My Attendance"
        leftAction={<BackAction />}
        textStyle={styles.title}
      />
      <ScrollContainer customStyle={{paddingTop: 20}}>
        <Table borderStyle={styles.tableWrapper}>
          <Row
            data={tableTitle}
            style={styles.head}
            textStyle={styles.textHead}
          />
          {records.length ? (
            <Rows
              data={records}
              textStyle={styles.textBody}
              style={{height: 100}}
            />
          ) : (
            <EmptyData info="You have Recent Attendance" />
          )}
        </Table>
      </ScrollContainer>
    </SafeAreaView>
  );
};

export default AttendanceRecordScreen;

const themeStyle = StyleService.create({
  title: {
    color: 'white',
  },
  tableWrapper: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'color-primary-500',
    borderRadius: 4,
  },
  tableText: {
    textTransform: 'capitalize',
    color: 'color-text',
  },
  head: {
    height: 60,
    backgroundColor: 'color-primary-500',
  },
  textHead: {
    textTransform: 'capitalize',
    textAlign: 'center',
    color: 'color-basic-100',
    fontFamily: 'Poppins-Regular',
    fontSize: hp(1.2),
  },
  textBody: {
    margin: 6,
    color: 'color-text`',
    fontFamily: 'Poppins-Regular',
    fontSize: hp(1.2),
    textAlign: 'center',
  },
});
