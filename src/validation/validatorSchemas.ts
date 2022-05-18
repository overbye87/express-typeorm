import * as yup from 'yup';

const email = yup.string()
  .email('Email field is not an email.')
  .required('Email field cannot be empty.');

const password = yup.string()
  .min(3, 'Password is too short.')
  .max(10, 'Password is too long.')
  .required('Password field cannot be empty.');

const textField = yup.string()
  .min(2, 'Text in field is too short')
  .max(50, 'Text in field is too long');

const signIn = yup.object().shape({
  body: yup.object().shape({
    email,
    password,
  }),
});

const signUp = yup.object({
  body: yup.object({
    email,
    password,
    firstName: textField,
    lastName: textField,
    login: textField,
  }),
});

export default {
  signIn,
  signUp,
};
