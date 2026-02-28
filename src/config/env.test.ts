import { getApiBaseUrl, getApiBearerToken } from './env';

describe('getApiBaseUrl', () => {
  const originalEnv = process.env.EXPO_PUBLIC_API_BASE_URL;
  const originalToken = process.env.EXPO_PUBLIC_API_BEARER_TOKEN;

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.EXPO_PUBLIC_API_BASE_URL;
      return;
    }

    process.env.EXPO_PUBLIC_API_BASE_URL = originalEnv;

    if (originalToken === undefined) {
      delete process.env.EXPO_PUBLIC_API_BEARER_TOKEN;
      return;
    }

    process.env.EXPO_PUBLIC_API_BEARER_TOKEN = originalToken;
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

  test('returns undefined bearer token when env var is missing', () => {
    delete process.env.EXPO_PUBLIC_API_BEARER_TOKEN;

    expect(getApiBearerToken()).toBeUndefined();
  });

  test('returns undefined bearer token when env var is blank', () => {
    process.env.EXPO_PUBLIC_API_BEARER_TOKEN = '   ';

    expect(getApiBearerToken()).toBeUndefined();
  });

  test('returns trimmed bearer token when set', () => {
    process.env.EXPO_PUBLIC_API_BEARER_TOKEN = '  token-123  ';

    expect(getApiBearerToken()).toBe('token-123');
  });
});
