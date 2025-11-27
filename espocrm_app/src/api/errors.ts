import { AxiosError } from 'axios';

type ErrorCategory = 'network' | 'auth' | 'validation' | 'unknown';

export type ApiError = {
  message: string;
  status?: number;
  category: ErrorCategory;
};

export const mapApiError = (error: AxiosError): ApiError => {
  if (error.response) {
    const status = error.response.status;
    if (status === 401 || status === 403) {
      return { message: 'Authentication failed', status, category: 'auth' };
    }
    if (status >= 400 && status < 500) {
      return { message: 'Validation error', status, category: 'validation' };
    }
    return {
      message: 'Server unavailable',
      status,
      category: 'network',
    };
  }

  if (error.request) {
    return { message: 'Network request failed', category: 'network' };
  }

  return { message: error.message || 'Unknown error', category: 'unknown' };
};
