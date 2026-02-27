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

export type ClaimStatus = 'pending' | 'under_review' | 'approved' | 'rejected' | 'returned' | 'expired';

export interface ClaimData {
  id: string;
  item_id: string;
  claimant_name: string;
  claimant_email: string;
  claimant_phone?: string | null;
  room_number?: string | null;
  description: string;
  status: ClaimStatus;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  review_notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ClaimResponse {
  data: ClaimData;
}

export type PatchClaimAction = 'approve' | 'reject' | 'request_evidence' | 'mark_returned' | 'expire';

export interface PatchClaimRequest {
  action: PatchClaimAction;
  reason?: string;
  notes?: string;
}
