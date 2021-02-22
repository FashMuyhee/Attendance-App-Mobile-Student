import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  fullname: yup.string().required('Fullname Required'),
  matric_no: yup.string().required('Matric Number Required'),
  department: yup.string().required('Department Required'),
});
