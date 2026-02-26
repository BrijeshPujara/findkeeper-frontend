import { getApiBaseUrl } from '../config/env';
import type { ApiHealthResponse, ClaimSubmitRequest, ItemCreateRequest, SearchRequest } from '../types/contracts';

type JsonBody = Record<string, unknown>;

const request = async <TResponse>(path: string, method: 'GET' | 'POST', body?: JsonBody): Promise<TResponse> => {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method,
    headers: {
      'content-type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`API ${method} ${path} failed (${response.status}): ${message}`);
  }

  return (await response.json()) as TResponse;
};

export const apiClient = {
  getHealth: (): Promise<ApiHealthResponse> => request<ApiHealthResponse>('/health', 'GET'),
  createItem: (payload: ItemCreateRequest): Promise<unknown> =>
    request<unknown>('/items', 'POST', {
      category: payload.category,
      locationFound: payload.locationFound,
      foundAtIso: payload.foundAtIso,
      notes: payload.notes,
    }),
  submitClaim: (payload: ClaimSubmitRequest): Promise<unknown> =>
    request<unknown>('/claims', 'POST', {
      itemId: payload.itemId,
      claimantName: payload.claimantName,
      claimantEmail: payload.claimantEmail,
      description: payload.description,
    }),
  searchItems: (payload: SearchRequest): Promise<unknown> =>
    request<unknown>(`/search?query=${encodeURIComponent(payload.query)}`, 'GET'),
};
