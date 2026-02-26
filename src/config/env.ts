const DEFAULT_API_BASE_URL = 'http://localhost:3000';

export const getApiBaseUrl = (): string => {
  const value = process.env.EXPO_PUBLIC_API_BASE_URL;
  if (!value || value.trim().length === 0) {
    return DEFAULT_API_BASE_URL;
  }

  return value.replace(/\/$/, '');
};
