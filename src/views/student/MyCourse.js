import React, {useState, useEffect} from 'react';
import {
  Icon,
  Text,
  TopNavigationAction,
  StyleService,
  useStyleSheet,
  Layout,
  Spinner,
} from '@ui-kitten/components';
import {
  ScrollContainer,
  Navbar,
  WelcomeNote,
  Fab,
  EmptyData,
} from '../../components';
import {inject, observer} from 'mobx-react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {fetchStudentCourses} from '../../controller/course';
import {Table, Row, Rows} from 'react-native-table-component';

const BackIcon = (style) => <Icon {...style} name="arrow-back" fill="white" />;

const MyCourseScreen = ({navigation, store}) => {
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
  const {user, userToken} = store;

  useEffect(() => {
    setLoading(true);
    fetchStudentCourses(userToken)
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
        <Table>
          <Row
            data={table.head}
            style={styles.head}
            textStyle={styles.textHead}
          />
          {loading ? (
            <Layout
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Spinner status="primary" />
              <Text>Fetching Your Courses...</Text>
            </Layout>
          ) : table.data.length ? (
            <Rows
              data={table.data}
              textStyle={styles.textBody}
              style={{height: 100}}
            />
          ) : (
            <EmptyData info="You have not added any course yet, click the + to add courses" />
          )}
        </Table>
      </ScrollContainer>
      <Fab
        onPress={() => navigation.navigate('stu_add_course')}
        icon="plus"
      />
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
    color: 'color-text`',
    fontFamily: 'Poppins-Regular',
    fontSize: hp(2),
  },
});
