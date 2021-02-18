import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  Icon,
  Text,
  TopNavigationAction,
  TabView,
  Tab,
} from '@ui-kitten/components';
import {
  ScrollContainer,
  Navbar,
  Table,
  TRow,
  TBody,
  TCell,
  THead,
} from '../../components';
import {inject, observer} from 'mobx-react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DetailedRecord from './DetailedRecord';
import SummaryRecord from './SummaryRecord';
const BackIcon = (style) => <Icon {...style} name="arrow-back" fill="white" />;

const MyAttendanceScreen = ({navigation, store}) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [table, setTable] = useState({
    tableTitle: ['S/N', 'Course Code', 'date', 'sign in', 'sign out', 'Unit'],
    detailedData: [
      {
        date: '1 may 2020',
        sign_in: '9am',
        sign_out: '12pm',
        id: 1,
        code: 'com123',
        unit: 3,
      },
      {
        date: '2 may 2020',
        sign_in: '9am',
        sign_out: '12pm',
        id: 2,
        code: 'com123',
        unit: 3,
      },
      {
        date: '3 may 2020',
        sign_in: '9am',
        sign_out: '12pm',
        id: 3,
        code: 'com123',
        unit: 3,
      },
      {
        date: '4 may 2020',
        sign_in: '9am',
        sign_out: '12pm',
        id: 4,
        code: 'com123',
        unit: 3,
      },
      {
        date: '5 may 2020',
        sign_in: '9am',
        sign_out: '12pm',
        id: 5,
        code: 'com123',
        unit: 3,
      },
      {
        date: '6 may 2020',
        sign_in: '9am',
        sign_out: '12pm',
        id: 6,
        code: 'com123',
        unit: 3,
      },
      {
        date: '7 may 2020',
        sign_in: '9am',
        sign_out: '12pm',
        id: 7,
        code: 'com123',
        unit: 3,
      },
      {
        date: '8 may 2020',
        sign_in: '9am',
        sign_out: '12pm',
        id: 8,
        code: 'com123',
        unit: 3,
      },
    ],
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      <Navbar
        title="My Attendance"
        leftAction={<BackAction />}
        textStyle={styles.title}
      />
      <ScrollContainer>
        <TabView
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
          useNativeDriver={true}
          style={{marginTop: 50}}>
          <Tab title="Summary View">
            <SummaryRecord renderData={table.detailedData} />
          </Tab>
          <Tab title="Detailed View">
            <DetailedRecord renderData={table.detailedData} />
          </Tab>
        </TabView>
      </ScrollContainer>
    </SafeAreaView>
  );
};

export default inject('store')(observer(MyAttendanceScreen));
const styles = StyleSheet.create({
  title: {
    color: 'white',
  },
  tableText: {
    textTransform: 'capitalize',
  },
});
