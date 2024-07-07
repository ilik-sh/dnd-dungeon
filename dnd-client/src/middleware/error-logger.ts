import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'notistack';

export const errorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.log(action.error);
  }
  return next(action);
};
