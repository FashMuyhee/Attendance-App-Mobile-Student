import React, {useState} from 'react';
import {View} from 'react-native';
import {
  Icon,
  Text,
  TopNavigationAction,
  StyleService,
  useStyleSheet,
  Layout,
} from '@ui-kitten/components';
import {
  ScrollContainer,
  Navbar,
  WelcomeNote,
  Fab,
  Table,
  THead,
  TBody,
  TCell,
  TRow,
} from '../../components';
import {inject, observer} from 'mobx-react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const BackIcon = (style) => <Icon {...style} name="arrow-back" fill="white" />;

const MyCourseScreen = ({navigation, store}) => {
  const styles = useStyleSheet(themedStyles);
  const [table, setTable] = useState({
    head: ['S/N', 'Course Title', 'Course Code', 'Unit'],
    data: [
      {course: 'Course 1', id: 1, code: 'com123', unit: 3},
      {course: 'Course 2', id: 2, code: 'com123', unit: 3},
      {course: 'Course 3', id: 3, code: 'com123', unit: 3},
      {course: 'Course 4', id: 4, code: 'com123', unit: 3},
      {course: 'Course 5', id: 5, code: 'com123', unit: 3},
      {course: 'Course 6', id: 6, code: 'com123', unit: 3},
      {course: 'Course 7', id: 7, code: 'com123', unit: 3},
      {course: 'Course 8', id: 8, code: 'com123', unit: 3},
    ],
  });

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  const {user} = store;

  return (
    <>
      <Navbar
        title="My Courses"
        leftAction={<BackAction />}
        textStyle={styles.title}
      />
      <ScrollContainer customStyle={styles.container}>
        <WelcomeNote
          bold={`Hi ${user.name.split(' ')[0]}`}
          normal="Here are your courses"
          subtitle="below ate the courses offered by you,you can choose to add more at any given time by by clicking the `+` button"
        />
        <Table>
          <THead>
            {table.head.map((data, key) => {
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
            {table.data.map((item, key) => {
              return (
                <TRow key={key}>
                  <TCell>
                    <Text style={styles.tableText}>{item.id}</Text>
                  </TCell>
                  <TCell>
                    <Text style={styles.tableText}>{item.course}</Text>
                  </TCell>
                  <TCell>
                    <Text style={styles.tableText}>{item.code}</Text>
                  </TCell>
                  <TCell>
                    <Text style={styles.tableText}>{item.unit}</Text>
                  </TCell>
                </TRow>
              );
            })}
          </TBody>
        </Table>
      </ScrollContainer>
      <Fab onPress={() => navigation.navigate('lect_add_course')} />
    </>
  );
};

export default inject('store')(observer(MyCourseScreen));
const themedStyles = StyleService.create({
  title: {
    color: 'white',
  },
  container: {
    width: '100%',
    position: 'relative',
    height: '100%',
  },
  head: {
    height: 40,
    backgroundColor: '#808B97',
  },
  tableText: {
    textTransform: 'capitalize',
  },
  text: {textAlign: 'center'},
});
