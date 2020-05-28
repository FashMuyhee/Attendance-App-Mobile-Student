import { decorate, observable, action, autorun } from 'mobx';
import { AsyncStorage } from 'react-native';

class Store {
  myTheme = 'lighTheme';

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
}
decorate(Store, {
  myTheme: observable,
  toggleTheme: action,
});
export default new Store();
