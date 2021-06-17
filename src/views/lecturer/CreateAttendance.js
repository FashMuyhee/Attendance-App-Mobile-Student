import React, {useState, useEffect} from 'react';
import {
  TopNavigationAction,
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
  Input,
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
import {useNavigation} from '@react-navigation/native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {createAttendance, createSignOutCode} from '../../controller/attendance';
import {fetchLecturerCourses} from '../../controller/course';
import Geolocation from 'react-native-geolocation-service';
import hasLocationPermission from '../../helpers/checkLocation';
import {KeyboardAvoidingView} from 'react-native';
import VectorIcon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {useSelector} from 'react-redux';

const CreateAttendanceScreen = () => {
  const styles = useStyleSheet(themedStyles);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [code, setCode] = useState('');
  const navigation = useNavigation();
  const [data, setData] = React.useState({name: 'Loading....'});
  const [value, setValue] = useState([]);
  const {user} = useSelector((state) => state.app_store);
  const [loading, setLoading] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [postMsg, setPostMsg] = React.useState({error: false, msg: {}});
  const [location, setLocation] = React.useState({});

  const BackIcon = (style) => (
    <Icon {...style} fill="white" name="arrow-back" />
  );

  const onSelect = (text) => {
    setValue(text);
  };

  const createAttendanceCode = async () => {
    const body = {
      course_id: value[0].toString(),
      location: location,
    };
    setLoading(true);
    const res = await createAttendance({body});
    const {message, type} = res;
    console.log(res);
    if (type === 'success') {
      setPostMsg({
        error: false,
        msg: {
          msg: `Attendance Sign-in Code has been Created Successfully`,
          code: `Sign-in Code ${message.attendance_code}`,
        },
      });
    }
    setLoading(false);
    setVisible(true);
  };

  const createAttendanceSignOutCode = async () => {
    const body = {
      course_id: value[0].toString(),
      location: location,
    };
    setLoading(true);
    const res = await createSignOutCode({
      body,
      att_code: code,
    }); //"5B00F4A",
    const {message, type} = res;
    console.log(res);
    if (type === 'success') {
      setPostMsg({
        error: false,
        msg: {
          msg: `Attendance Sign-out Code has been Created Successfully`,
          code: `Sign-in Code ${message.code}`,
        },
      });
    }
    setLoading(false);
    setVisible(true);
  };

  const getLocation = async () => {
    const checkLocationPermission = await hasLocationPermission();

    if (!checkLocationPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        setVisible(true);
        setPostMsg({
          error: true,
          msg: `Couldn't get your location make sure your location setting is on`,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 50,
        forceRequestLocation: true,
      },
    );
  };

  useEffect(() => {
    getLocation();
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
        title="Create Attendance"
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
          normal="Let's add some courses"
          subtitle="Select an attendance action you intend to perform create Sign-in
          code for a new class or sign-out for a finished lecturer"
        />
        <Container customStyle={styles.form}>
          <TabView
            selectedIndex={selectedIndex}
            onSelect={(index) => setSelectedIndex(index)}
            useNativeDriver={true}>
            <Tab title="Class Sign In">
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
                  }}
                />
                <Button onPress={createAttendanceCode} disabled={loading}>
                  {!loading ? 'Create Sign-In Code' : 'Creating Sign-In Code'}
                </Button>
              </Layout>
            </Tab>
            <Tab title="Class Sign Out">
              <KeyboardAvoidingView>
                <FormBody style={styles.form}>
                  <Input
                    placeholder="Attendance Sign-in Code"
                    onChangeText={setCode}
                    style={styles.input}
                    returnKeyType="done"
                    onSubmitEditing={createSignOutCode}
                  />

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
                    onPress={createAttendanceSignOutCode}
                    disabled={loading}>
                    {!loading
                      ? 'Create Sign-Out Code'
                      : 'Creating Sign-Out Code'}
                  </Button>
                </FormBody>
              </KeyboardAvoidingView>
            </Tab>
          </TabView>
        </Container>
        <ModalAlert
          isVisible={visible}
          closeModal={() => setVisible(false)}
          message={postMsg.msg.msg}
          subtitle={postMsg.msg.code}
          btnText="Close"
          warn={postMsg.error}
        />
      </Container>
    </>
  );
};

export default CreateAttendanceScreen;

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
  dropdownInput: {
    padding: 12,
    borderWidth: 1,
    borderColor: 'color-primary-500',
    backgroundColor: 'background-basic-color-1',
    borderRadius: 5,
    height: hp(5),
    color: 'color-text',
    placeholderColor: 'color-text',
    marginBottom: 20,
  },
  dropdownItem: {
    padding: 10,
    color: 'color-text',
    fontFamily: 'Poppins-Regular',
  },
  bgTheme: {
    backgroundColor: 'background-basic-color-1',
  },
});
