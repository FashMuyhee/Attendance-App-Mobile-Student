import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollContainer, LoaderText, EmptyData} from '../../components';
import {StyleService, useStyleSheet} from '@ui-kitten/components';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Table, Row, Rows} from 'react-native-table-component';

const SummaryRecord = ({renderData, loading}) => {
  const [tableTitle] = useState([
    'S/N',
    'Course Code',
    'date',
    'sign in',
    'sign out',
    // 'Unit',
  ]);
  const styles = useStyleSheet(themeStyle);

  return (
    <ScrollContainer customStyle={styles.container}>
      <Table borderStyle={styles.tableWrapper}>
        <Row
          data={tableTitle}
          style={styles.head}
          textStyle={styles.textHead}
        />
        {loading ? (
          <LoaderText
            loadingText="Your Attendance Is Loading"
            loading={loading}
          />
        ) : renderData.length ? (
          <Rows
            data={renderData}
            textStyle={styles.textBody}
            style={{height: 100}}
          />
        ) : (
          <EmptyData info="You have Recent Attendance" />
        )}
      </Table>
    </ScrollContainer>
  );
};
export default SummaryRecord;

const themeStyle = StyleService.create({
  container: {
    paddingTop: 20,
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
