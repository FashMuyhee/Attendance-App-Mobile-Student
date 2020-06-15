import {decorate, observable, action, autorun} from 'mobx';
import {AsyncStorage} from 'react-native';

class Store {
  myTheme = 'lighTheme';
  userToken = '';
  user = {
    id: 1,
    name: 'Ebenezer Arobadi',
    matric_no: 'F/HD/18/3210023',
    department: 'Computer Science',
    level: 'HND2',
  };

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

  setUser = (user) => {
    this.user = user;
  };
}
decorate(Store, {
  myTheme: observable,
  userToken: observable,
  user: observable,
  toggleTheme: action,
  setUser: action,
});
export default new Store();
