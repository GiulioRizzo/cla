import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosRetry, { exponentialDelay } from 'axios-retry';
import { Buffer } from 'buffer';
import { env, isBearerMode } from '../config/env';
import { authStorage } from '../storage/authStorage';
import { mapApiError, ApiError } from './errors';

const createClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: env.apiBaseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(async config => {
    const token = await authStorage.getToken();
    if (token && isBearerMode()) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (!isBearerMode()) {
      const credentials = await authStorage.getCredentials();
      if (credentials) {
        const encoded = Buffer.from(
          `${credentials.username}:${credentials.password}`,
        ).toString('base64');
        config.headers.Authorization = `Basic ${encoded}`;
      }
    }
    if (env.networkLogging) {
      // eslint-disable-next-line no-console
      console.info('[HTTP request]', config.method, config.url, config.data);
    }
    return config;
  });

  instance.interceptors.response.use(
    response => {
      if (env.networkLogging) {
        // eslint-disable-next-line no-console
        console.info('[HTTP response]', response.status, response.config.url);
      }
      return response;
    },
    async (error: AxiosError) => {
      const apiError: ApiError = mapApiError(error);
      if (env.networkLogging) {
        // eslint-disable-next-line no-console
        console.warn('[HTTP error]', apiError);
      }
      return Promise.reject(apiError);
    },
  );

  axiosRetry(instance, {
    retries: env.retryLimit,
    retryDelay: exponentialDelay,
    retryCondition: error => {
      const status = error.response?.status;
      if (!status) return true;
      if (status === 401 || status === 403) return false;
      return status === 429 || status >= 500;
    },
  });

  return instance;
};

export const httpClient = createClient();

export const withPagination = (
  config: AxiosRequestConfig,
  params?: { offset?: number; maxSize?: number },
): AxiosRequestConfig => ({
  ...config,
  params: {
    ...config.params,
    ...params,
  },
});
