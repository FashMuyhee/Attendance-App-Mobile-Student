import axios from 'axios';
import env from '../helpers/env';
import FormData from 'form-data';
const login = async ({matric_no, password}) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${env.url}/students/login`,
        {
          matric_no: matric_no,
          password: password,
        },
        {timeout: 30000},
      )
      .then(({data}) => {
        const {token} = data.payload.user;
        resolve(token);
      })
      .catch((error) => {
        const {error: errorMsg} = error.response.data.payload;
        if (
          errorMsg.hasOwnProperty('passwordField') &&
          errorMsg.hasOwnProperty('uidField')
        ) {
          reject('incorrect matric number or password');
        } else if (errorMsg.passwordField === 'password') {
          reject('password incorrect');
        }
        reject(errorMsg);
      });
  });
};

const lecturerLogin = async ({email, password}) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${env.url}/lecturers/login`,
        {
          email: email,
          password: password,
        },
        {timeout: 30000},
      )
      .then(({data}) => {
        const {token} = data.payload.user;
        resolve(token);
      })
      .catch((error) => {
        const {error: errorMsg} = error.response.data.payload;
        if (
          errorMsg.hasOwnProperty('passwordField') &&
          errorMsg.hasOwnProperty('uidField')
        ) {
          reject('incorrect email or password');
        } else if (errorMsg.passwordField === 'password') {
          reject('password incorrect');
        }
        reject(errorMsg);
      });
  });
};

const register = async ({
  fullname,
  matric_no,
  department,
  level,
  email,
  password,
}) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `${env.url}/students`,
      data: {
        matric_no: matric_no,
        password: password,
        fullname: fullname,
        department: department,
        email: email,
        level: level,
      },
      timeout: 30000,
    })
      .then((data) => {
        resolve(data.data.payload);
      })
      .catch((error) => {
        const {error: errorMsg} = error.response.data.payload;
        errorMsg.forEach((index) => {
          if (
            index.hasOwnProperty('field') &&
            index.field == 'email' &&
            index.hasOwnProperty('validation') &&
            index.validation == 'unique'
          ) {
            reject('Email has been used by another student');
          } else if (
            index.hasOwnProperty('field') &&
            index.field == 'matric_no' &&
            index.hasOwnProperty('validation') &&
            index.validation == 'unique'
          ) {
            reject(`You can't register with someone matric number`);
          }
        });
      });
  });
};
const lecturerRegister = async ({
  fullname,
  staff_no,
  department,
  level,
  email,
  password,
}) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `${env.url}/lecturers`,
      data: {
        staff_no: staff_no,
        password: password,
        fullname: fullname,
        department: department,
        email: email,
        level: level,
      },
      timeout: 30000,
    })
      .then((data) => {
        resolve(data.data.payload);
      })
      .catch((error) => {
        const {error: errorMsg} = error.response.data.payload;
        errorMsg.forEach((index) => {
          if (
            index.hasOwnProperty('field') &&
            index.field == 'email' &&
            index.hasOwnProperty('validation') &&
            index.validation == 'unique'
          ) {
            reject('Email has been used by another student');
          } else if (
            index.hasOwnProperty('field') &&
            index.field == 'staff_no' &&
            index.hasOwnProperty('validation') &&
            index.validation == 'unique'
          ) {
            reject(`You can't register with someone staff number`);
          }
        });
      });
  });
};

const profile = async (token) => {
  if (token) {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${env.url}/students/1`,
        headers: {Authorization: `Bearer ${token}`},

        timeout: 30000,
      });
      return data.payload.data;
    } catch (error) {
      return error.response;
    }
  } else {
    return {error: 'invalid user'};
  }
};

const lecturerProfile = async (token) => {
  if (token) {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${env.url}/lecturers/1`,
        headers: {Authorization: `Bearer ${token}`},

        timeout: 30000,
      });
      return data.data;
    } catch (error) {
      return error.response;
    }
  } else {
    return {error: 'invalid user'};
  }
};

const createFormData = (photo) => {
  const data = new FormData();
  data.append('dp', {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  });
  return data;
};

const uploadStudentDp = async (image, token,role) => {
  try {
    const {data} = await axios({
      method: 'put',
      url: `${env.url}/${role}s/8/uploadDp`,
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'multipart/form-data',
      },
      data: createFormData(image),
      timeout: 30000,
    });
    return data.payload;
  } catch (error) {
    return error.response.data;
  }
};

export {
  login,
  register,
  profile,
  lecturerLogin,
  lecturerRegister,
  lecturerProfile,
  uploadStudentDp,
};
