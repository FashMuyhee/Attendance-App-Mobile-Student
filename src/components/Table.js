import React from 'react';
import {View} from 'react-native';
import {StyleService, Layout, useStyleSheet} from '@ui-kitten/components';

const Table = ({children}) => {
  const styles = useStyleSheet(themedStyles);
  return <Layout style={styles.tableContainer}>{children}</Layout>;
};

const THead = ({children}) => {
  const styles = useStyleSheet(themedStyles);

  return <View style={styles.tableHead}>{children}</View>;
};

const TBody = ({children}) => {
  const styles = useStyleSheet(themedStyles);

  return <View style={styles.tableBody}>{children}</View>;
};

const TRow = ({children}) => {
  const styles = useStyleSheet(themedStyles);

  return <View style={styles.tableRow}>{children}</View>;
};

const TCell = ({children}) => {
  const styles = useStyleSheet(themedStyles);

  return <View style={styles.tableCell}>{children}</View>;
};

export {Table, THead, TBody, TRow, TCell};

const themedStyles = StyleService.create({
  tableContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    backgroundColor: 'background-basic-color-2',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginBottom: 30,
  },
  tableHead: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 50,
    alignItems: 'center',
    backgroundColor: 'color-primary-400',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  tableBody: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 50,
    borderBottomColor: 'color-primary-default',
    borderBottomWidth: .5,
    width: '100%',
  },
  tableCell: {
    marginRight: 30,
  },
});
