import AsyncStorage from '@react-native-async-storage/async-storage';

const setCredentials = async (credentials) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(credentials));
  } catch (error) {
    console.log('Something went wrong', error);
  }
};

const getCredentials = async () => {
  try {
    let userData = await AsyncStorage.getItem('userData');
    let data = JSON.parse(userData);
    // console.log(data);
    return data;
  } catch (error) {
    console.log('Something went wrong', error);
  }
};
const removeCredentials = async () => {
  try {
    await AsyncStorage.removeItem('userData');
  } catch (e) {
    console.log(e);
  }
};

export {setCredentials, getCredentials, removeCredentials};
