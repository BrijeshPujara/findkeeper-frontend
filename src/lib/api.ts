import { getApiBaseUrl, getApiBearerToken } from '../config/env';
import type {
  ApiHealthResponse,
  ClaimResponse,
  ClaimSubmitRequest,
  ItemCreateRequest,
  PatchClaimRequest,
  SearchItemsResponse,
  SearchRequest,
} from '../types/contracts';

type JsonBody = Record<string, unknown>;

const request = async <TResponse>(
  path: string,
  method: 'GET' | 'POST' | 'PATCH',
  body?: JsonBody,
  options: { headers?: Record<string, string> } = {}
): Promise<TResponse> => {
  const bearerToken = getApiBearerToken();

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method,
    headers: {
      'content-type': 'application/json',
      ...(bearerToken ? { authorization: `Bearer ${bearerToken}` } : {}),
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
  submitClaim: (payload: ClaimSubmitRequest, idempotencyKey?: string): Promise<unknown> =>
    request<unknown>('/claims', 'POST', {
      item_id: payload.itemId,
      claimant_name: payload.claimantName,
      claimant_email: payload.claimantEmail,
      description: payload.description,
    }, idempotencyKey ? { headers: { 'idempotency-key': idempotencyKey } } : {}),
  getClaimById: (claimId: string): Promise<ClaimResponse> => request<ClaimResponse>(`/claims/${claimId}`, 'GET'),
  patchClaim: (claimId: string, payload: PatchClaimRequest): Promise<ClaimResponse> =>
    request<ClaimResponse>(`/claims/${claimId}`, 'PATCH', {
      action: payload.action,
      reason: payload.reason,
      notes: payload.notes,
    }),
  searchItems: (payload: SearchRequest): Promise<SearchItemsResponse> =>
    request<SearchItemsResponse>(`/search?q=${encodeURIComponent(payload.query)}`, 'GET'),
};
