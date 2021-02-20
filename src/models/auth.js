import axios from 'axios';
const login = async ({matric_no, password}) => {
  return new Promise((resolve, reject) => {
    if (password && matric_no) {
      if (password.length >= 8) {
        axios
          .post(
            `https://mobile-attendance-api.herokuapp.com/students/login`,
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
      } else {
        reject({error: 'password too short'});
      }
    } else {
      reject({error: 'matric number and password required'});
    }
  });
};

const register = async () => {};

const profile = async (token) => {
  if (token) {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `https://mobile-attendance-api.herokuapp.com/students/1`,
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

export {login, register, profile};