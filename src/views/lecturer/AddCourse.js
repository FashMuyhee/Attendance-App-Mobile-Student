import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Icon,
  useStyleSheet,
  TopNavigationAction,
  Button,
  StyleService,
} from '@ui-kitten/components';
import {Container, Navbar, WelcomeNote} from '../../components';
import {inject, observer} from 'mobx-react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {lecturerAddCourse, fetchAllCourses} from '../../controller/course';
import Snackbar from 'react-native-snackbar';
import SearchableDropdown from 'react-native-searchable-dropdown';

const BackIcon = (style) => <Icon {...style} name="arrow-back" fill="white" />;

const AddCourseScreen = ({navigation, store}) => {
  const styles = useStyleSheet(themeStyle);

  const navigateBack = () => {
    navigation.goBack();
  };
  const {user, userToken} = store;

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const [value, setValue] = useState(null);
  const [data, setData] = React.useState({name: 'Loading....'});
  const [loading, setLoading] = React.useState(false);

  const onSelect = (text) => {
    setValue({...text});
  };

  const handleAddCourse = () => {
    setLoading(true);
    lecturerAddCourse(value.id, userToken)
      .then((data) => {
        setLoading(false);
        Snackbar.show({
          text: data.message,
          duration: Snackbar.LENGTH_SHORT,
          textColor: 'white',
        });
        console.log(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };

  useEffect(() => {
    fetchAllCourses()
      .then((data) => {
        setData(data);
      })
      .catch((e) => {
        console.log('not fetched 😞💔😓');
        console.log(e);
      });
  }, []);

  return (
    <>
      <Navbar
        title="Add Course"
        leftAction={<BackAction />}
        textStyle={styles.title}
      />
      <Container>
        <WelcomeNote
          bold={`Hi ${user.name.split(' ')[0]}`}
          normal="Let's add some courses"
          subtitle="Select your department,level,semester and the desired courses you need to add"
        />
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
        <Button
          style={{marginTop: 30}}
          onPress={handleAddCourse}
          disabled={loading}>
          Register Course
        </Button>
      </Container>
    </>
  );
};

export default inject('store')(observer(AddCourseScreen));
const themeStyle = StyleService.create({
  title: {
    color: 'white',
  },
  input: {
    marginBottom: hp('2%'),
    padding: 20,
  },
  dropdownInput: {
    padding: 12,
    borderWidth: 1,
    borderColor: 'color-primary-500',
    backgroundColor: 'background-basic-color-1',
    borderRadius: 5,
    height: hp(7),
    color: 'color-text',
    placeholderColor: 'color-text',
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
``;
