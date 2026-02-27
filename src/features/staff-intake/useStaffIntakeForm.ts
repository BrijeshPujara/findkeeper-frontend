import { useState } from 'react';
import { apiClient } from '../../lib/api';
import type { ItemSummary } from '../../types/contracts';

export type FormErrors = {
  category?: string;
  locationFound?: string;
  foundAtIso?: string;
};

export type StaffIntakeFormState = {
  loading: boolean;
  statusMessage: string;
  category: string;
  locationFound: string;
  foundAtIso: string;
  notes: string;
  errors: FormErrors;
  searchQuery: string;
  searchLoading: boolean;
  searchStatusMessage: string;
  searchResults: ItemSummary[];
};

export type StaffIntakeFormActions = {
  setCategory: (value: string) => void;
  setLocationFound: (value: string) => void;
  setFoundAtIso: (value: string) => void;
  setNotes: (value: string) => void;
  submitItem: () => Promise<void>;
  checkApi: () => Promise<void>;
  setSearchQuery: (value: string) => void;
  runSearch: () => Promise<void>;
};

export const useStaffIntakeForm = (): StaffIntakeFormState & StaffIntakeFormActions => {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Ready');
  const [category, setCategory] = useState('');
  const [locationFound, setLocationFound] = useState('');
  const [foundAtIso, setFoundAtIso] = useState(new Date().toISOString());
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchStatusMessage, setSearchStatusMessage] = useState('Run a search to see staff results.');
  const [searchResults, setSearchResults] = useState<ItemSummary[]>([]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (category.trim().length === 0) {
      nextErrors.category = 'Category is required.';
    }

    if (locationFound.trim().length === 0) {
      nextErrors.locationFound = 'Location is required.';
    }

    if (foundAtIso.trim().length === 0) {
      nextErrors.foundAtIso = 'Found-at date time is required.';
    } else if (Number.isNaN(Date.parse(foundAtIso.trim()))) {
      nextErrors.foundAtIso = 'Found-at must be a valid ISO date time.';
    }

    return nextErrors;
  };

  const updateCategory = (value: string) => {
    setCategory(value);
    if (errors.category) {
      setErrors((previous) => ({ ...previous, category: undefined }));
    }
  };

  const updateLocationFound = (value: string) => {
    setLocationFound(value);
    if (errors.locationFound) {
      setErrors((previous) => ({ ...previous, locationFound: undefined }));
    }
  };

  const updateFoundAtIso = (value: string) => {
    setFoundAtIso(value);
    if (errors.foundAtIso) {
      setErrors((previous) => ({ ...previous, foundAtIso: undefined }));
    }
  };

  const checkApi = async () => {
    setLoading(true);
    try {
      const health = await apiClient.getHealth();
      setStatusMessage(`API OK (${health.stage}) at ${new Date(health.timestamp).toLocaleTimeString()}`);
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  const submitItem = async () => {
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatusMessage('Fix validation errors before submitting.');
      return;
    }

    const idempotencyKey = `item-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;

    setLoading(true);
    try {
      const response = await apiClient.createItem(
        {
          category: category.trim(),
          locationFound: locationFound.trim(),
          foundAtIso: new Date(foundAtIso.trim()).toISOString(),
          notes: notes.trim().length > 0 ? notes.trim() : undefined,
        },
        idempotencyKey
      );

      const itemId =
        typeof response === 'object' &&
        response !== null &&
        'data' in response &&
        typeof (response as { data?: { id?: string } }).data?.id === 'string'
          ? (response as { data: { id: string } }).data.id
          : undefined;

      setStatusMessage(itemId ? `Item created: ${itemId}` : 'Item created successfully.');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Item submission failed');
    } finally {
      setLoading(false);
    }
  };

  const runSearch = async () => {
    const trimmed = searchQuery.trim();

    if (trimmed.length < 2) {
      setSearchStatusMessage('Enter at least 2 characters to search.');
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    try {
      const response = await apiClient.searchItems({ query: trimmed });
      const results = Array.isArray(response.data) ? response.data : [];
      setSearchResults(results);

      if (results.length === 0) {
        setSearchStatusMessage(`No items found for "${trimmed}".`);
      } else {
        setSearchStatusMessage(`Found ${results.length} item(s) for "${trimmed}".`);
      }
    } catch (error) {
      setSearchResults([]);
      setSearchStatusMessage(error instanceof Error ? error.message : 'Search failed');
    } finally {
      setSearchLoading(false);
    }
  };

  return {
    loading,
    statusMessage,
    category,
    locationFound,
    foundAtIso,
    notes,
    errors,
    searchQuery,
    searchLoading,
    searchStatusMessage,
    searchResults,
    setCategory: updateCategory,
    setLocationFound: updateLocationFound,
    setFoundAtIso: updateFoundAtIso,
    setNotes,
    submitItem,
    checkApi,
    setSearchQuery,
    runSearch,
  };
};
