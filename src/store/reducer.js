import {LOGOUT, SET_THEME, SET_TOKEN, SET_USER} from './type';

const initialState = {
  isDark: false,
  user: {},
  userToken: null,
  isLoggedIn: false,
};

export default AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        isDark: !state.isDark,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case SET_TOKEN:
      return {
        ...state,
        userToken: action.payload,
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        userToken: {},
        isLoggedIn: false,
        user: {},
      };
    default:
      return state;
  }
};
