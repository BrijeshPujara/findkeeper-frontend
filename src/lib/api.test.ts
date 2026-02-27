jest.mock('../config/env', () => ({
  getApiBaseUrl: jest.fn(() => 'http://api.test'),
}));

import { apiClient } from './api';

describe('apiClient', () => {
  const fetchMock = jest.fn() as jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    fetchMock.mockReset();
    global.fetch = fetchMock;
  });

  test('getHealth calls GET /health and returns parsed JSON', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'ok', routeKey: 'GET /health', stage: 'dev', timestamp: '2026-01-01T00:00:00.000Z' }),
    } as Response);

    const result = await apiClient.getHealth();

    expect(fetchMock).toHaveBeenCalledWith('http://api.test/health', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      body: undefined,
    });
    expect(result.message).toBe('ok');
  });

  test('createItem maps camelCase payload to backend snake_case request keys', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { id: 'item-1' } }),
    } as Response);

    await apiClient.createItem({
      category: 'wallet',
      locationFound: 'Gate B',
      foundAtIso: '2026-02-26T10:00:00.000Z',
      notes: 'black leather',
    });

    expect(fetchMock).toHaveBeenCalledWith('http://api.test/items', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        category: 'wallet',
        location_found: 'Gate B',
        found_at: '2026-02-26T10:00:00.000Z',
        notes: 'black leather',
      }),
    });
  });

  test('createItem sends idempotency-key header when provided', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { id: 'item-2' } }),
    } as Response);

    await apiClient.createItem(
      {
        category: 'phone',
        locationFound: 'Lobby',
        foundAtIso: '2026-02-27T15:00:00.000Z',
      },
      'item-1234567890abcdef'
    );

    expect(fetchMock).toHaveBeenCalledWith('http://api.test/items', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'idempotency-key': 'item-1234567890abcdef',
      },
      body: JSON.stringify({
        category: 'phone',
        location_found: 'Lobby',
        found_at: '2026-02-27T15:00:00.000Z',
        notes: undefined,
      }),
    });
  });

  test('searchItems uses q query parameter expected by backend', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [] }),
    } as Response);

    await apiClient.searchItems({ query: 'wallet' });

    expect(fetchMock).toHaveBeenCalledWith('http://api.test/search?q=wallet', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      body: undefined,
    });
  });

  test('submitClaim maps payload keys to backend snake_case contract', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { id: 'claim-1' } }),
    } as Response);

    await apiClient.submitClaim({
      itemId: 'item-1',
      claimantName: 'Alex',
      claimantEmail: 'alex@example.com',
      description: 'I can describe contents',
    });

    expect(fetchMock).toHaveBeenCalledWith('http://api.test/claims', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        item_id: 'item-1',
        claimant_name: 'Alex',
        claimant_email: 'alex@example.com',
        description: 'I can describe contents',
      }),
    });
  });

  test('throws descriptive error when backend response is not ok', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 400,
      text: async () => 'bad request',
    } as Response);

    await expect(apiClient.searchItems({ query: 'w' })).rejects.toThrow(
      'API GET /search?q=w failed (400): bad request'
    );
  });
});
