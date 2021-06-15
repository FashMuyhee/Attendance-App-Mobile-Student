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

const setTheme = async (theme) => {
  try {
    await AsyncStorage.setItem('theme', JSON.stringify(theme));
  } catch (error) {
    console.log('Something went wrong', error);
  }
};

const getTheme = async () => {
  try {
    let data = await AsyncStorage.getItem('theme');
    const theme = JSON.parse(data);
    return theme;
  } catch (error) {
    console.log('Something went wrong', error);
  }
};

const setTokenToStorage = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.log('Something went wrong', error);
  }
};

const getToken = async () => {
  try {
    let data = await AsyncStorage.getItem('token');
    const token = data;
    return token;
  } catch (error) {
    console.log('Something went wrong', error);
  }
};

export {
  setCredentials,
  getCredentials,
  removeCredentials,
  getTheme,
  setTheme,
  setTokenToStorage,
  getToken,
};
