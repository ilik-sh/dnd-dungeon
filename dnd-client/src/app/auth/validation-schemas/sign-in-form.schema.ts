import * as yup from 'yup';

export const signInFormSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('This is not a valid email'),
  password: yup.string().required('Password is required'),
});

export type SignInForm = yup.InferType<typeof signInFormSchema>;
