import { getApiBaseUrl } from '../config/env';
import type {
  ApiHealthResponse,
  ClaimSubmitRequest,
  ItemCreateRequest,
  SearchItemsResponse,
  SearchRequest,
} from '../types/contracts';

type JsonBody = Record<string, unknown>;

const request = async <TResponse>(
  path: string,
  method: 'GET' | 'POST',
  body?: JsonBody,
  options: { headers?: Record<string, string> } = {}
): Promise<TResponse> => {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method,
    headers: {
      'content-type': 'application/json',
      ...options.headers,
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
  createItem: (payload: ItemCreateRequest, idempotencyKey?: string): Promise<unknown> =>
    request<unknown>('/items', 'POST', {
      category: payload.category,
      location_found: payload.locationFound,
      found_at: payload.foundAtIso,
      notes: payload.notes,
    }, idempotencyKey ? { headers: { 'idempotency-key': idempotencyKey } } : {}),
  submitClaim: (payload: ClaimSubmitRequest): Promise<unknown> =>
    request<unknown>('/claims', 'POST', {
      item_id: payload.itemId,
      claimant_name: payload.claimantName,
      claimant_email: payload.claimantEmail,
      description: payload.description,
    }),
  searchItems: (payload: SearchRequest): Promise<SearchItemsResponse> =>
    request<SearchItemsResponse>(`/search?q=${encodeURIComponent(payload.query)}`, 'GET'),
};
