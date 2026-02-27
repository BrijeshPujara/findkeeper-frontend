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

export interface ItemSummary {
  id: string;
  category: string;
  location_found: string;
  found_at: string;
  status: string;
}

export interface SearchItemsResponse {
  data: ItemSummary[];
  pagination?: {
    page: number;
    page_size: number;
    total: number;
    total_pages?: number;
  };
}
