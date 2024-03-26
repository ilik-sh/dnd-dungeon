import axios from "axios";
import { LocalStorageKeys } from "enums/local-storage-keys.enum";

export const axiosClient = axios.create({ baseURL: import.meta.env.API_ROUTE });

axiosClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(LocalStorageKeys.AccessToken);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem(LocalStorageKeys.RefreshToken);
      try {
        const tokens = await axiosClient.get(`auth/refresh`, {
          headers: {
            Authorization: `Bearer ${refresh}`,
          },
        });

        if (!tokens) {
          localStorage.removeItem(LocalStorageKeys.RefreshToken);
          return;
        }

        localStorage.setItem(
          LocalStorageKeys.AccessToken,
          tokens.data.accessToken
        );

        return axiosClient(originalRequest);
      } catch (error) {
        localStorage.removeItem(LocalStorageKeys.AccessToken);
        localStorage.removeItem(LocalStorageKeys.RefreshToken);
        return Promise.reject(error);
      }
    }

    throw error;
  }
);
