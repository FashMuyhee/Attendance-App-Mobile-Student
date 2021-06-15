import axios from 'axios';
import env from '../helpers/env';
import FormData from 'form-data';
import {getToken} from '../helpers/app-persistent';
import RNFetchBlob from 'rn-fetch-blob';
import {Platform} from 'react-native';

const token = getToken();

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
  data.append('image_file1', {
    // name: photo.fileName,
    // type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  });
  data.append('image_url2', userDp);
  data.append('api_secret', 'IfHgePPhTEUV-OLbCX_WvmywrGUZc8TH');
  data.append('api_key', 'BI3M7CGFH8TGQsSH9lMk5oeg4MST8L0s');
  console.log(data);
  return data;
};

/**
 * A Function to compare similarities
 * between two images
 * the higher their differences the similar the images
 * @param {imageOne} photo
 * @param {imageTwo} dp
 */
const compareImageDp = async (photo, dp) => {
  const {size, filename} = await RNFetchBlob.fs.stat(photo.uri);
  const formData = [
    {
      name: 'image_file1',
      data: RNFetchBlob.wrap(photo.uri),
      filename: filename,
      type: 'image/jpeg',
    },
    {
      name: 'image_url2',
      data: dp,
    },
    {
      name: 'api_secret',
      data: 'IfHgePPhTEUV-OLbCX_WvmywrGUZc8TH',
    },
    {
      name: 'api_key',
      data: 'BI3M7CGFH8TGQsSH9lMk5oeg4MST8L0s',
    },
  ];
  try {
    const data = await RNFetchBlob.fetch(
      'POST',
      'https://api-us.faceplusplus.com/facepp/v3/compare',
      {
        'content-type': 'multipart/form-data',
      },
      formData,
    );

    console.log(JSON.parse(data.data));
    return JSON.parse(data.data);
  } catch (e) {
    console.log(e);
  }
};

const markAttendance = async ({body, code, token}) => {
  // try {
  axios({
    method: 'put',
    url: `${env.url}/attendances/mark_attendance/${code}`,
    headers: {
      authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
    data: body,
    timeout: 30000,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.response);
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
          const schema = [
            key + 1,
            ele.student_id,
            index.date,
            ele.signed_in ? ele.signed_in_time : '',
            ele.signed_out ? ele.signed_out_time : '',
          ];
          genAttendance.push(schema);
        });
      }
    });
    return genAttendance;
  } catch (error) {
    return error;
  }
};

const getStudentAttendanceByCourse = async (token, course_id) => {
  try {
    const {data} = await axios({
      method: 'get',
      url: `${env.url}/students/4/get_attendance_by_courses?course_id=${course_id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      timeout: 30000,
    });

    /* const {
      totalAttendance,
      myAttendanceCount,
      data: attendanceData,
    } = data.payload; */
    return data.payload;
  } catch (error) {
    return error;
  }
};

const getStudentAllAttendance = async (token) => {
  try {
    const {data} = await axios({
      method: 'get',
      url: `${env.url}/students/4/get_detailed_attendance`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      timeout: 30000,
    });

    const response = data.payload;

    const myAttendance = response.map((item, key) => {
      return [
        key + 1,
        item.course.code.toUpperCase(),
        new Date(item.date).toDateString(),
        item.signed_in_time,
        item.signed_out_time,
      ];
    });
    return myAttendance;
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
  getStudentAttendanceByCourse,
  getStudentAllAttendance,
};
