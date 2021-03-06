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
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {lecturerAddCourse, fetchAllCourses} from '../../controller/course';
import Snackbar from 'react-native-snackbar';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import VectorIcon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

const BackIcon = (style) => <Icon {...style} name="arrow-back" fill="white" />;

const AddCourseScreen = ({navigation}) => {
  const styles = useStyleSheet(themeStyle);

  const navigateBack = () => {
    navigation.goBack();
  };
  const {user} = useSelector((state) => state.app_store);

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const [value, setValue] = useState([]);
  const [data, setData] = React.useState({name: 'Loading....'});
  const [loading, setLoading] = React.useState(false);

  const onSelect = (text) => {
    setValue(text);
  };

  const handleAddCourse = () => {
    setLoading(true);
    lecturerAddCourse(value[0])
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
          style={{marginTop: 30}}
          onPress={handleAddCourse}
          disabled={loading}>
          Register Course
        </Button>
      </Container>
    </>
  );
};

export default AddCourseScreen;

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
});
``;
