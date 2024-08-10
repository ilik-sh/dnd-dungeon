import * as yup from 'yup';

export const signInFormSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export type SignInForm = yup.InferType<typeof signInFormSchema>;
