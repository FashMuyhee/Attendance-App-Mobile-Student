import {
  SET_TOKEN,
  SET_THEME,
  SET_USER,
  LOGOUT,
  SET_LECTURE_LOCATION,
  SET_SYSTEM_THEME,
} from './type';

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

export const saveLectureLocation = (location) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LECTURE_LOCATION,
      payload: location,
    });
  };
};

export const switchSystemTheme = () => {
  return async (dispatch) => {
    dispatch({
      type: SET_SYSTEM_THEME,
    });
  };
};
