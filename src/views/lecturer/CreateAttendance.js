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
import {useNavigation} from '@react-navigation/native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {createAttendance} from '../../controller/attendance';
import {fetchLecturerCourses} from '../../controller/course';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Geolocation from 'react-native-geolocation-service';
import hasLocationPermission from '../../helpers/checkLocation';
import {KeyboardAvoidingView} from 'react-native';

const CreateAttendanceScreen = ({store}) => {
  const styles = useStyleSheet(themedStyles);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigation = useNavigation();
  const [data, setData] = React.useState({name: 'Loading....'});
  const [value, setValue] = useState(null);
  const {user, userToken} = store;
  const [loading, setLoading] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [postMsg, setPostMsg] = React.useState({error: false, msg: {}});
  const [location, setLocation] = React.useState({});

  const BackIcon = (style) => (
    <Icon {...style} fill="white" name="arrow-back" />
  );

  const onSelect = (text) => {
    setValue({...text});
  };

  const createAttendanceCode = async () => {
    const body = {
      course_id: value.id.toString(),
      location: location,
    };
    setLoading(true);
    const res = await createAttendance({body, token: userToken});
    const {message, type} = res;
    console.log(res);
    if (type === 'success') {
      setPostMsg({
        error: false,
        msg: {
          msg: `Attendance Sign-in Code for ${value.name} has been Created Successfully`,
          code: `Sign-in Code ${message.attendance_code}`,
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
                <Button onPress={createAttendanceCode} disabled={loading}>
                  {!loading ? 'Create Sign-In Code' : 'Creating Sign-In Code'}
                </Button>
              </Layout>
            </Tab>
            <Tab title="Class Sign Out">
              <KeyboardAvoidingView>
                <FormBody style={styles.form}>
                  <SearchableDropdown
                    onTextChange={(text) => console.log(text)}
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
                  <Button onPress={createAttendanceCode} disabled={loading}>
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

export default inject('store')(observer(CreateAttendanceScreen));
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
