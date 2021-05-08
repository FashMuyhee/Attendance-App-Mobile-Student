import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  Divider,
  Icon,
  Text,
  TopNavigationAction,
  styled,
  Button,
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
const BackIcon = (style) => <Icon {...style} name="arrow-back" fill="white" />;

const AttendanceRecordScreen = ({navigation, store, route}) => {
  const navigateBack = () => {
    navigation.goBack();
  };
  const {userToken} = store;
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  const records = route.params.attendance;
  const [table] = useState({
    tableTitle: ['S/N', 'Matric No', 'date', 'sign in', 'sign out'],
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <Navbar
        title="My Attendance"
        leftAction={<BackAction />}
        textStyle={styles.title}
      />
      <ScrollContainer>
        <Table style={{marginTop: 30}}>
          <THead>
            {table.tableTitle.map((data, key) => {
              return (
                <TCell key={key}>
                  <Text style={{color: 'white', textTransform: 'uppercase'}}>
                    {data}
                  </Text>
                </TCell>
              );
            })}
          </THead>
          <TBody>
            {records.map((record, key) => {
              return (
                <TRow key={key}>
                  <TCell>
                    <Text style={styles.tableText}>{record.id}</Text>
                  </TCell>
                  <TCell>
                    <Text style={styles.tableText}>{record.student}</Text>
                  </TCell>
                  <TCell>
                    <Text style={styles.tableText}>{record.date}</Text>
                  </TCell>
                  <TCell>
                    <Text style={styles.tableText}>{record.sign_in}</Text>
                  </TCell>
                  <TCell>
                    <Text style={styles.tableText}>{record.sign_out}</Text>
                  </TCell>
                </TRow>
              );
            })}
          </TBody>
        </Table>
      </ScrollContainer>
    </SafeAreaView>
  );
};

export default inject('store')(observer(AttendanceRecordScreen));
const styles = StyleSheet.create({
  title: {
    color: 'white',
  },
  tableText: {
    textTransform: 'capitalize',
  },
});
