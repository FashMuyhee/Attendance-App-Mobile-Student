import React, {useState, useEffect} from 'react';
import {
  TopNavigationAction,
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
  Select,
  Tab,
  TabView,
  Button,
} from '@ui-kitten/components';
import {
  Navbar,
  Container,
  ModalAlert,
  FormBody,
  WelcomeNote,
} from '../../components';
import {inject, observer} from 'mobx-react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {getLecturerAttendanceByCourse} from '../../controller/attendance';
import {fetchLecturerCourses} from '../../controller/course';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {KeyboardAvoidingView} from 'react-native';

const AttendanceQueryScreen = ({store, navigation}) => {
  const styles = useStyleSheet(themedStyles);
  const [data, setData] = React.useState({name: 'Loading....'});
  const [value, setValue] = useState(null);
  const {user, userToken} = store;
  const [loading, setLoading] = React.useState(false);

  const BackIcon = (style) => (
    <Icon {...style} fill="white" name="arrow-back" />
  );

  const onSelect = (text) => {
    setValue({...text});
  };

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const attendance = await getLecturerAttendanceByCourse(
        userToken,
        value.id.toString(),
      );
      setLoading(false);
      navigation.navigate('lect_attendance', {attendance});
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLecturerCourses(userToken, true)
      .then((data) => {
        setData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <Navbar
        title="Attendance Record"
        textStyle={styles.title}
        leftAction={
          <TopNavigationAction
            icon={BackIcon}
            onPress={() => navigation.goBack()}
          />
        }
      />
      <Container customStyle={styles.screen}>
        <WelcomeNote
          bold={`Hi ${user.name.split(' ')[0]}`}
          normal="Time for Some Records"
          subtitle="Select the Course and Date you want to view record for"
        />
        <Container customStyle={styles.form}>
          <Layout style={styles.form}>
            <SearchableDropdown
              onItemSelect={onSelect}
              selectedItems={value}
              containerStyle={{padding: 5}}
              textInputStyle={styles.dropdownInput}
              itemStyle={styles.dropdownItem}
              itemTextStyle={styles.dropdownItemText}
              items={data}
              defaultIndex={2}
              placeholder="Enter Course..."
              resetValue={false}
              underlineColorAndroid="transparent"
              
            />
            <Button onPress={fetchAttendance} disabled={loading}>
              {!loading ? 'View Attendance' : 'Fetching Attendance'}
            </Button>
          </Layout>
        </Container>
      </Container>
    </>
  );
};

export default inject('store')(observer(AttendanceQueryScreen));
const themedStyles = StyleService.create({
  screen: {
    // height: '100%',
    width: '100%',
    position: 'relative',
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: 'background-basic-color-1',
  },
  navBar: {
    backgroundColor: 'color-primary-default',
    color: 'white',
  },
  title: {
    color: 'white',
  },
  form: {
    marginTop: '10%',
  },
  input: {
    marginBottom: hp('2%'),
  },
  button: {
    marginBottom: hp('4%'),
  },
  dropdownInput: {
    padding: 12,
    borderWidth: 1,
    borderColor: 'color-primary-500',
    backgroundColor: 'background-basic-color-1',
    borderRadius: 5,
    height: hp(7),
    color: 'color-text',
    marginBottom: hp(2),
  },
  dropdownItem: {
    padding: 10,
    backgroundColor: 'background-basic-color-1',
    borderColor: 'color-primary-500',
    borderWidth: 0.5,
  },
  dropdownItemText: {
    color: 'color-text',
  },
});
