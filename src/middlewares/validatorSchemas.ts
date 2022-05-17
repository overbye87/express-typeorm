import * as yup from 'yup';

const email = yup.string().email('is not email').required('need email');
const password = yup.string().min(3, 'pasword to short').max(10, 'password to long');
const string = yup.string().min(2, 'to short').max(50, 'to long');

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
    firstName: string,
    lastName: string,
    login: string,
  }),
}).required();

export default {
  signIn,
  signUp,
};
