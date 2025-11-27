import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

const TOKEN_KEY = 'auth_token';

export type AuthCredentials = {
  username: string;
  password: string;
};

export const authStorage = {
  async saveToken(token: string) {
    await Keychain.setGenericPassword(TOKEN_KEY, token, {
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
    });
  },
  async getToken(): Promise<string | null> {
    const credentials = await Keychain.getGenericPassword();
    if (credentials && credentials.username === TOKEN_KEY) {
      return credentials.password;
    }
    return null;
  },
  async clearToken() {
    await Keychain.resetGenericPassword();
  },
  async saveCredentials(credentials: AuthCredentials) {
    await AsyncStorage.setItem('credentials', JSON.stringify(credentials));
  },
  async getCredentials(): Promise<AuthCredentials | null> {
    const stored = await AsyncStorage.getItem('credentials');
    return stored ? (JSON.parse(stored) as AuthCredentials) : null;
  },
  async clearCredentials() {
    await AsyncStorage.removeItem('credentials');
  },
};
