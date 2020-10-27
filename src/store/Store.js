import {decorate, observable, action, autorun} from 'mobx';
import {AsyncStorage} from 'react-native';

class Store {
  myTheme = 'lightTheme';
  userToken = '';
  user = {
    id: 1,
    name: 'Fasoranti Oluwamuyiwa',
    matric_no: 'F/HD/18/3210014',
    department: 'Computer Science',
    level: 'HND2',
    role: 'student',
  };
  isLoggedIn = false;

  toggleTheme = (theme) => {
    this.myTheme = theme === 'lightTheme' ? 'darkTheme' : 'lightTheme';
    // console.log(this.myTheme);
  };

  themeToStorage = autorun(async () => {
    try {
      await AsyncStorage.setItem('theme', this.myTheme);
    } catch (error) {
      console.error(error);
    }
  });

  setToken = (token) => {
    this.userToken = token;
  };
  setIsLoggedIn = (status) => {
    this.isLoggedIn = status;
  };

  setUser = (user) => {
    this.user = user;
  };
}
decorate(Store, {
  myTheme: observable,
  userToken: observable,
  user: observable,
  isLoggedIn: observable,
  toggleTheme: action,
  setUser: action,
  setIsLoggedIn: action,
});
export default new Store();
