import axios from 'axios';
import env from '../helpers/env';
import FormData from 'form-data';
import {getToken} from '../helpers/app-persistent';

const token = getToken();

const http = axios.create({
  baseURL: env.url,
  timeout: 8000,
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

const createAttendance = async ({body, token}) => {
  try {
  
    const {data} = await axios({
      method: 'post',
      url: `${env.url}/attendances/create_attendance`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      data: body,
      timeout: 30000,
    });

    return data.payload;
  } catch (error) {
    return error.response;
  }
};

export {createAttendance};
