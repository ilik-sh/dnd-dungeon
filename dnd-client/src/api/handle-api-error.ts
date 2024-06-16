import { ApiError } from 'app/auth/types/api.error';
import axios from 'axios';

export const handleApiError = (error: any) => {
  console.log(error);
  if (axios.isAxiosError(error)) {
    const message = error.response?.data.errors[0];
    const statusCode = error.response?.status;
    return { message, statusCode } as ApiError;
  }
  return {
    message: 'Unknown erorr',
    statusCode: 500,
  } as ApiError;
};
