import {decorate, observable, action, autorun} from 'mobx';
class Store {
  userToken = '';
  user = {
    id: 1,
    name: 'Fasoranti Oluwamuyiwa',
    matric_no: 'F/HD/18/3210014',
    department: 'Computer Science',
    level: 'HND2',
    role: 'lecturer',
  };
  isLoggedIn = false;

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
  userToken: observable,
  user: observable,
  isLoggedIn: observable,
  setUser: action,
  setIsLoggedIn: action,
});
export default new Store();
