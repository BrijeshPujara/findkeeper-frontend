import { getApiBaseUrl } from './env';

describe('getApiBaseUrl', () => {
  const originalEnv = process.env.EXPO_PUBLIC_API_BASE_URL;

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.EXPO_PUBLIC_API_BASE_URL;
      return;
    }

    process.env.EXPO_PUBLIC_API_BASE_URL = originalEnv;
  });

  test('returns default URL when env var is missing', () => {
    delete process.env.EXPO_PUBLIC_API_BASE_URL;

    expect(getApiBaseUrl()).toBe('http://localhost:3000');
  });

  test('returns default URL when env var is blank', () => {
    process.env.EXPO_PUBLIC_API_BASE_URL = '   ';

    expect(getApiBaseUrl()).toBe('http://localhost:3000');
  });

  test('trims a trailing slash from env var', () => {
    process.env.EXPO_PUBLIC_API_BASE_URL = 'http://localhost:4000/';

    expect(getApiBaseUrl()).toBe('http://localhost:4000');
  });

  test('returns env var as-is when valid and without trailing slash', () => {
    process.env.EXPO_PUBLIC_API_BASE_URL = 'https://api.example.com';

    expect(getApiBaseUrl()).toBe('https://api.example.com');
  });
});
