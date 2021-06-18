import axios from 'axios';
import env from '../helpers/env';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';

const createAttendance = async () => {
  try {
    const {data} = await axios({
      method: 'post',
      url: `${env.url}/attendances/create_attendance`,
      headers: {
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

/**
 * A Function to compare similarities
 * between two images
 * the higher their differences the similar the images
 * @param  photo
 * @param  dp
 */
const compareImageDp = async (photo, dp) => {
  const {filename} = await RNFetchBlob.fs.stat(photo.uri);
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

/**
 * A Function to mark student attendance
 * @param body
 * @param code
 */
const markAttendance = async ({body, code}) => {
  try {
    const {data} = await axios({
      method: 'put',
      url: `${env.url}/attendances/mark_attendance/${code}`,
      headers: {
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

/**
 * A Function to signout student attendance
 * @param body
 * @param code
 */
const signoutAttendance = async (body) => {
  try {
    const {data} = await axios({
      method: 'put',
      url: `${env.url}/attendances/signout`,
      headers: {
        'Content-type': 'application/json',
      },
      data: body,
      timeout: 30000,
    });
    console.log(data.payload);
    return data.payload;
  } catch (error) {
    return error.response.data.payload;
  }
};

const createSignOutCode = async ({body, att_code}) => {
  try {
    const {data} = await axios({
      method: 'put',
      url: `${env.url}/attendances/create_signout/${att_code}`,
      headers: {
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

const getAttendanceLocation = async ({code}) => {
  try {
    const {data} = await axios({
      method: 'get',
      url: `${env.url}/attendances/get_attendance_location/${code}`,
      headers: {
        'Content-type': 'application/json',
      },
      timeout: 30000,
    });

    return data.payload;
  } catch (error) {
    return error.response.data.payload;
  }
};

// attendance array generator
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
          date: moment(item.created_at).format('ddd Do MMM,YYYY'),
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

// get all lecturer attendance
const getAllLecturerAttendance = async () => {
  try {
    const {data} = await axios({
      method: 'get',
      url: `${env.url}/lecturers/4/get_attendances/`,
      headers: {
        'Content-type': 'application/json',
      },
      timeout: 30000,
    });
    return generateAttendanceRecord(data.payload);
  } catch (error) {
    return error.response.data.payload;
  }
};

// filter lecturer attendance by course
const getLecturerAttendanceByCourse = async (course_id) => {
  try {
    const {data} = await axios({
      method: 'get',
      url: `${env.url}/lecturers/4/attendance_by_course?course_id=${course_id}`,
      headers: {
        'Content-type': 'application/json',
      },
      timeout: 30000,
    });
    let genAttendance = [];
    const records = data.payload;
    records.forEach((index, key) => {
      const parsedRecords = index.attendance;
      if (parsedRecords.length) {
        parsedRecords.forEach((ele) => {
          const schema = [
            key + 1,
            ele.student.matric_no,
            moment(index.date).format('ddd Do MMM,YYYY'),
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

// get student attendance by course
const getStudentAttendanceByCourse = async (course_id) => {
  try {
    const {data} = await axios({
      method: 'get',
      url: `${env.url}/students/4/get_attendance_by_courses?course_id=${course_id}`,
      headers: {
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

// get all students attendance
const getStudentAllAttendance = async () => {
  try {
    const {data} = await axios({
      method: 'get',
      url: `${env.url}/students/4/get_detailed_attendance`,
      headers: {
        'Content-type': 'application/json',
      },
      timeout: 30000,
    });

    const response = data.payload;

    const myAttendance = response.map((item, key) => {
      return [
        key + 1,
        item.course.code.toUpperCase(),
        moment(item.date).format('ddd Do MMM,YYYY'),
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
  createSignOutCode,
  signoutAttendance,
};
