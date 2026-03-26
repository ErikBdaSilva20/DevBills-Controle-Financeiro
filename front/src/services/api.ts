import axios, { type AxiosInstance, type InternalAxiosRequestConfig, AxiosHeaders } from 'axios';
import { firebaseAuth } from '../config/firebase';

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const user = firebaseAuth.currentUser;

    if (user) {
      try {
        const token = await user.getIdToken();

        if (!config.headers) {
          config.headers = new AxiosHeaders();
        }

        // Use o método set do AxiosHeaders
        (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
      } catch (error) {}
    }

    return config;
  }
);
