export interface ApiHealthResponse {
  message: string;
  routeKey: string;
  stage: string;
  timestamp: string;
}

export interface ItemCreateRequest {
  category: string;
  locationFound: string;
  foundAtIso: string;
  notes?: string;
}

export interface ClaimSubmitRequest {
  itemId: string;
  claimantName: string;
  claimantEmail: string;
  description: string;
}

export interface SearchRequest {
  query: string;
}
