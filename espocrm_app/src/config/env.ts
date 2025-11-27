import Config from 'react-native-config';

export type AuthMode = 'Bearer' | 'Basic';

const parseRetryLimit = (value?: string): number => {
  const parsed = Number(value);
  if (Number.isNaN(parsed) || parsed < 0) {
    return 0;
  }
  return parsed;
};

export const env = {
  apiBaseUrl: (Config.API_BASE_URL || '/api/v1/').replace(/\/$/, '') + '/',
  authMode: (Config.AUTH_MODE as AuthMode) || 'Bearer',
  retryLimit: parseRetryLimit(Config.RETRY_LIMIT) || 0,
  networkLogging: Config.NETWORK_LOGGING === 'true',
};

export const isBearerMode = () => env.authMode === 'Bearer';
