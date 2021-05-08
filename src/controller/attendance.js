import axios from 'axios';
import env from '../helpers/env';
import FormData from 'form-data';
import {getToken} from '../helpers/app-persistent';

const token = getToken();

/* const http = axios.create({
  baseURL: env.url,
  timeout: 8000,
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
}); */

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

const createFormData = (photo, userDp) => {
  const data = new FormData();
  data.append('img_1', {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  });
  data.append('img_2', userDp);
  return data;
};

/**
 * A Function to compare similarities
 * between two images
 * the higher their differences the similar the images
 * @param {imageOne} cameraDp
 * @param {imageTwo} saveDp
 */
const compareImageDp = async (photo, dp) => {
  try {
    console.log('processing');
    const {data} = await axios({
      method: 'POST',
      url: `http://facexapi.com/compare_faces`,
      data: JSON.stringify({
        img_1: photo,
        img_2: dp,
      }),
      headers: {
        'content-type': 'application/json',
        user_id: '604b4bdebeb79d20279c232a',
      },
    });
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

const markAttendance = async ({body, code, token}) => {
  // try {
  axios({
    method: 'put',
    url: `${env.url}/attendances/mark_attendance/${code}M`,
    headers: {
      authorization: `Bearer ${token}`,
      // 'Content-type': 'application/json',
      'content-type':
        'multipart/form-data; boundary=---011000010111000001101001',
    },
    data: createFormData(body.image, body.location),
    timeout: 30000,
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.data);
    });

  //   return data;
  // } catch (error) {
  //   return error.response;
  // }
};

const getAttendanceLocation = async ({code, token}) => {
  try {
    const {data} = await axios({
      method: 'get',
      url: `${env.url}/attendances/get_attendance_location/${code}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      timeout: 30000,
    });

    return data.payload;
  } catch (error) {
    return error.response.data.payload;
  }
};

const generateAttendanceRecord = (attendance_record) => {
  let genAttendance = [];

  const attendances = attendance_record;
  attendances.forEach((item, key) => {
    const record = JSON.parse(item.attendance);
    if (record.length) {
      record.forEach((ele) => {
        const schema = {
          id: key + 1,
          course: item.course_id,
          date: item.created_at,
          student: ele.student_id,
          sign_in: ele.signed_in ? ele.signed_in_time : '',
          sign_out: ele.signed_out ? ele.signed_out_time : '',
        };
        genAttendance.push(schema);
      });
    }
  });

  return genAttendance;
};

const getAllLecturerAttendance = async (token) => {
  try {
    const {data} = await axios({
      method: 'get',
      url: `${env.url}/lecturers/4/get_attendances/`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      timeout: 30000,
    });
    return generateAttendanceRecord(data.payload);
  } catch (error) {
    return error.response.data.payload;
  }
};

const getLecturerAttendanceByCourse = async (token, course_id) => {
  try {
    const {data} = await axios({
      method: 'get',
      url: `${env.url}/lecturers/4/attendance_by_course?course_id=${course_id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      timeout: 30000,
    });
    let genAttendance = [];
    const records = data.payload;
    records.forEach((index, key) => {
      const parsedRecords = JSON.parse(index.attendance);
      if (parsedRecords.length) {
        parsedRecords.forEach((ele) => {
          const schema = {
            id: key + 1,
            date: index.date,
            student: ele.student_id,
            sign_in: ele.signed_in ? ele.signed_in_time : '',
            sign_out: ele.signed_out ? ele.signed_out_time : '',
          };
          genAttendance.push(schema);
        });
      }
    });
    return genAttendance;
  } catch (error) {
    return error;
  }
};

export {
  createAttendance,
  markAttendance,
  getAttendanceLocation,
  compareImageDp,
  getAllLecturerAttendance,
  getLecturerAttendanceByCourse,
};
