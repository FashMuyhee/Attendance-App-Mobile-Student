import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Table, TRow, TBody, TCell, THead} from '../../components';
const SummaryRecord = ({renderData}) => {
  const [tableTitle, ] = useState(['S/N', 'Course Code', 'date', 'sign in', 'sign out', 'Unit'])
  
  return (
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
  );
};
export default SummaryRecord;

const styles = StyleSheet.create({
  tableText: {
    textTransform: 'capitalize',
  },
});
