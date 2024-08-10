import * as yup from 'yup';

export const signUpFormSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('This is not a valid email'),
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export type SignUpForm = yup.InferType<typeof signUpFormSchema>;
