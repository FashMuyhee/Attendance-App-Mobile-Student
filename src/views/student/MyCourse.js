import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  Icon,
  TopNavigationAction,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {
  ScrollContainer,
  Navbar,
  WelcomeNote,
  Fab,
  EmptyData,
  LoaderText,
} from '../../components';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {fetchStudentCourses} from '../../controller/course';
import {Table, Row, Rows} from 'react-native-table-component';
import {useSelector} from 'react-redux';

const BackIcon = (style) => <Icon {...style} name="arrow-back" fill="white" />;

const MyCourseScreen = ({navigation}) => {
  const styles = useStyleSheet(themedStyles);
  const [table, setTable] = useState({
    head: ['S/N', 'Course Title', 'Course Code'],
    data: [],
  });
  const [loading, setLoading] = useState(false);

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  const {user} = useSelector((state) => state.app_store);

  useEffect(() => {
    setLoading(true);
    fetchStudentCourses()
      .then((data) => {
        setTable({...table, data});
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

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
        <Table borderStyle={styles.tableWrapper}>
          <Row
            data={table.head}
            style={styles.head}
            textStyle={styles.textHead}
          />
          {loading ? (
            <LoaderText
              loadingText="Fetching Your Courses..."
              loading={loading}
            />
          ) : table.data.length ? (
            <Rows
              data={table.data}
              textStyle={styles.textBody}
              style={{height: 70}}
            />
          ) : (
            <EmptyData info="You have not added any course yet, click the + to add courses" />
          )}
        </Table>
      </ScrollContainer>
      <Fab onPress={() => navigation.navigate('stu_add_course')} icon="plus" />
    </>
  );
};

export default MyCourseScreen;

const themedStyles = StyleService.create({
  title: {
    color: 'white',
  },
  container: {
    width: '100%',
    position: 'relative',
    height: '100%',
  },
  tableWrapper: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'color-primary-500',
    borderRadius: 4,
  },
  head: {
    height: 60,
    backgroundColor: 'color-primary-500',
  },
  tableText: {
    textTransform: 'capitalize',
  },
  textHead: {
    textAlign: 'center',
    color: 'color-basic-100',
    fontFamily: 'Poppins-Regular',
  },
  textBody: {
    margin: 6,
    color: 'color-text',
    fontFamily: 'Poppins-Regular',
    fontSize: hp(1.4),
    textAlign: 'center',
  },
});
