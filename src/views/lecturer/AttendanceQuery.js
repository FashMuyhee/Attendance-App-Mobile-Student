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
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {getLecturerAttendanceByCourse} from '../../controller/attendance';
import {fetchLecturerCourses} from '../../controller/course';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import VectorIcon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

const AttendanceQueryScreen = ({navigation}) => {
  const styles = useStyleSheet(themedStyles);
  const [data, setData] = React.useState({name: 'Loading....'});
  const [value, setValue] = useState([]);
  const {user} = useSelector((state) => state.app_store);
  const [loading, setLoading] = React.useState(false);

  const BackIcon = (style) => (
    <Icon {...style} fill="white" name="arrow-back" />
  );

  const onSelect = (text) => {
    setValue(text);
  };

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const attendance = await getLecturerAttendanceByCourse(
        value[0].toString(),
      );
      setLoading(false);
      navigation.navigate('lect_attendance', {attendance});
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLecturerCourses(true)
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
            <SectionedMultiSelect
              items={data}
              IconRenderer={VectorIcon}
              uniqueKey="id"
              selectText="Enter Course"
              showDropDowns={true}
              onSelectedItemsChange={onSelect}
              selectedItems={value}
              searchPlaceholderText="Search Course ..."
              displayKey="name"
              alwaysShowSelectText
              single
              onCancel={() => setValue('')}
              showCancelButton
              styles={{
                itemText: {
                  ...styles.dropdownItem,
                },
                button: {backgroundColor: '#00BA4A'},
                selectToggle: {
                  ...styles.dropdownInput,
                },
                container: {
                  ...styles.bgTheme,
                },
                item: {
                  ...styles.bgTheme,
                },
                searchBar: {
                  ...styles.bgTheme,
                },
                searchTextInput: {
                  ...styles.dropdownItem,
                },
              }}
              colors={{
                selectToggleTextColor: styles.dropdownItem.color,
              }}
            />
            <Button
              onPress={fetchAttendance}
              disabled={loading}
              style={styles.button}>
              {!loading ? 'View Attendance' : 'Fetching Attendance'}
            </Button>
          </Layout>
        </Container>
      </Container>
    </>
  );
};

export default AttendanceQueryScreen;

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
    marginTop: hp('2%'),
  },
  dropdownInput: {
    padding: 12,
    borderWidth: 1,
    borderColor: 'color-primary-500',
    backgroundColor: 'background-basic-color-1',
    borderRadius: 5,
    height: hp(5),
    color: 'color-text',
    placeholderColor: 'color-text',
  },
  dropdownItem: {
    padding: 10,
    color: 'color-text',
    fontFamily: 'Poppins-Regular',
  },
  bgTheme: {
    backgroundColor: 'background-basic-color-1',
  },
  textTheme: {
    color: 'color-text',
  },
});
