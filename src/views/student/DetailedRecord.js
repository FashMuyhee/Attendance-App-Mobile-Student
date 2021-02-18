import React, {useState} from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import {
  Table,
  TRow,
  TBody,
  TCell,
  THead,
  Fab,
  ScrollContainer,
  FilterSheet,
} from '../../components';
import filter from '../../assets/img/filter.png';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ActionSheet from 'react-native-actions-sheet';

const DetailedRecord = ({renderData}) => {
  const [tableTitle] = useState([
    'S/N',
    'Course Code',
    'date',
    'sign in',
    'sign out',
    'Unit',
  ]);

  const filterSheet = React.createRef();

  React.useEffect(() => {
    filterSheet.current?.setModalVisible();
  }, []);

  return (
    <ScrollContainer customStyle={styles.container}>
      <Table>
        <THead>
          {tableTitle.map((data, key) => {
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
          {renderData.map((item, key) => {
            return (
              <TRow key={key}>
                <TCell>
                  <Text style={styles.tableText}>{item.id}</Text>
                </TCell>
                <TCell>
                  <Text style={styles.tableText}>{item.code}</Text>
                </TCell>
                <TCell>
                  <Text style={styles.tableText}>{item.date}</Text>
                </TCell>
                <TCell>
                  <Text style={styles.tableText}>{item.sign_in}</Text>
                </TCell>
                <TCell>
                  <Text style={styles.tableText}>{item.sign_out}</Text>
                </TCell>
                <TCell>
                  <Text style={styles.tableText}>{item.unit}</Text>
                </TCell>
              </TRow>
            );
          })}
        </TBody>
      </Table>
      <Fab
        imageIcon={filter}
        onPress={() => filterSheet.current?.setModalVisible()}
      />
      <FilterSheet sheet={filterSheet} />
    </ScrollContainer>
  );
};
export default DetailedRecord;

const styles = StyleSheet.create({
  container: {
    paddingLeft: '0%',
    paddingRight: '0%',
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
    // height:1300
  },
  tableText: {
    textTransform: 'capitalize',
  },
});
