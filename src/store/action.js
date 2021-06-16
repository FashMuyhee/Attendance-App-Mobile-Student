import {SET_TOKEN, SET_THEME, SET_USER, LOGOUT} from './type';

export const saveUserToken = (token) => {
  return async (dispatch) => {
    dispatch({
      type: SET_TOKEN,
      payload: token,
    });
  };
};

export const toggleTheme = () => {
  return async (dispatch) => {
    dispatch({
      type: SET_THEME,
    });
  };
};

export const saveUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: SET_USER,
      payload: user,
    });
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: LOGOUT,
    });
  };
};
