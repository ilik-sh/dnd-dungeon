import { ApiError } from 'app/auth/types/api.error';
import axios from 'axios';

export const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data || error.message;
    const statusCode = error.response?.status;
    return { data, statusCode } as ApiError;
  }
  return {
    data: 'Unknown erorr',
    statusCode: 500,
  } as ApiError;
};
