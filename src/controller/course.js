import axios from 'axios';
import env from '../helpers/env';

const fetchAllCourses = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${env.url}/courses`, {timeout: 30000})
      .then(({data}) => {
        resolve(data.payload.data.courses);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const fetchCoursesByLevel = async (level) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${env.url}/courses/fetch_by_level/${level}`, {timeout: 30000})
      .then(({data}) => {
        const courses = data.payload.map((course, key) => {
          return {
            name: course.title,
            code: course.code,
            id: course.id,
          };
        });
        resolve(courses);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

const studentAddCourse = async (course_id, user) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${env.url}/students/2/add_course`,
      method: 'post',
      timeout: 30000,
      headers: {Authorization: `Bearer ${user}`},
      data: {
        course_id,
      },
    })
      .then(({data}) => {
        resolve(data.payload);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

const fetchStudentCourses = async (user) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${env.url}/students/2/get_courses`,
      method: 'get',
      timeout: 30000,
      headers: {Authorization: `Bearer ${user}`},
    })
      .then(({data}) => {
        const myCourse = data.payload.message['courses'].map((course, key) => {
          const code = course.code.toUpperCase();
          return [key, course.title, code];
        });
        resolve(myCourse);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export {
  fetchAllCourses,
  fetchCoursesByLevel,
  studentAddCourse,
  fetchStudentCourses,
};
