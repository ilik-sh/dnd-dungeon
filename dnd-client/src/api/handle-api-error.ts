import { ApiError } from "app/auth/types/api.error";
import axios from "axios";

export const handleApiError = (error: any) => {
  if (axios.isAxiosError<ApiError>(error)) {
    return error.response?.data as ApiError;
  }
  return {
    message: "Unknown erorr",
    statusCode: 500,
  } as ApiError;
};
