import { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Button, Card, EmptyState, StatusChip, TextField } from '../components/ui';
import { apiClient } from '../lib/api';
import type { ClaimData, PatchClaimAction } from '../types/contracts';
import { styles } from './styles/StaffIntakeScreen.styles';

type ReviewStatus = 'submitted' | 'under_review' | 'resolved' | 'rejected';

type ReviewClaim = {
  id: string;
  claimantName: string;
  description: string;
  itemLabel: string;
  location: string;
  status: ReviewStatus;
  source: 'mock' | 'api';
};

const statusTone: Record<ReviewStatus, 'info' | 'warning' | 'success' | 'danger'> = {
  submitted: 'info',
  under_review: 'warning',
  resolved: 'success',
  rejected: 'danger',
};

export const StaffReviewQueueScreen = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'resolved'>('pending');
  const [lookupClaimId, setLookupClaimId] = useState('');
  const [loadingLookup, setLoadingLookup] = useState(false);
  const [claims, setClaims] = useState<ReviewClaim[]>([
    {
      id: 'claim-101',
      claimantName: 'Alex Johnson',
      description: 'Black wallet with transit card in inner sleeve.',
      itemLabel: 'Black wallet',
      location: 'Gate B',
      status: 'submitted',
      source: 'mock',
    },
    {
      id: 'claim-102',
      claimantName: 'Maya Singh',
      description: 'Blue phone case with small scratch near camera.',
      itemLabel: 'Phone with blue case',
      location: 'Lobby',
      status: 'under_review',
      source: 'mock',
    },
    {
      id: 'claim-099',
      claimantName: 'Jordan Lee',
      description: 'Silver keys with red keychain.',
      itemLabel: 'Set of keys',
      location: 'Terminal desk',
      status: 'resolved',
      source: 'mock',
    },
  ]);
  const [selectedId, setSelectedId] = useState<string | null>('claim-101');
  const [statusMessage, setStatusMessage] = useState('Select a claim to review actions.');

  const filteredClaims = useMemo(() => {
    if (filter === 'all') {
      return claims;
    }

    if (filter === 'pending') {
      return claims.filter((claim) => claim.status === 'submitted' || claim.status === 'under_review');
    }

    return claims.filter((claim) => claim.status === 'resolved' || claim.status === 'rejected');
  }, [claims, filter]);

  const selectedClaim = useMemo(() => claims.find((claim) => claim.id === selectedId) ?? null, [claims, selectedId]);

  const toUiStatus = (status: ClaimData['status']): ReviewStatus => {
    if (status === 'pending') {
      return 'submitted';
    }

    if (status === 'under_review') {
      return 'under_review';
    }

    if (status === 'approved' || status === 'returned') {
      return 'resolved';
    }

    return 'rejected';
  };

  const fetchClaim = async () => {
    const claimId = lookupClaimId.trim();
    if (claimId.length === 0) {
      setStatusMessage('Enter a claim ID to load backend review data.');
      return;
    }

    setLoadingLookup(true);
    try {
      const response = await apiClient.getClaimById(claimId);
      const mapped: ReviewClaim = {
        id: response.data.id,
        claimantName: response.data.claimant_name,
        description: response.data.description,
        itemLabel: 'Matched item',
        location: 'Tenant scope',
        status: toUiStatus(response.data.status),
        source: 'api',
      };

      setClaims((previous) => {
        const withoutExisting = previous.filter((claim) => claim.id !== mapped.id);
        return [mapped, ...withoutExisting];
      });
      setSelectedId(mapped.id);
      setStatusMessage(`Loaded claim ${mapped.id} from backend.`);
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Unable to load claim by ID.');
    } finally {
      setLoadingLookup(false);
    }
  };

  const updateStatus = async (status: ReviewStatus) => {
    if (!selectedClaim) {
      setStatusMessage('Choose a claim first.');
      return;
    }

    if (selectedClaim.source === 'api') {
      const actionMap: Record<ReviewStatus, PatchClaimAction> = {
        submitted: 'request_evidence',
        under_review: 'request_evidence',
        resolved: 'approve',
        rejected: 'reject',
      };

      try {
        const response = await apiClient.patchClaim(selectedClaim.id, {
          action: actionMap[status],
          notes: 'Action applied from staff review queue.',
        });

        setClaims((previous) =>
          previous.map((claim) =>
            claim.id === selectedClaim.id
              ? {
                  ...claim,
                  status: toUiStatus(response.data.status),
                }
              : claim
          )
        );
        setStatusMessage(`Backend updated for ${selectedClaim.id}: ${response.data.status.replace('_', ' ')}`);
        return;
      } catch (error) {
        setStatusMessage(error instanceof Error ? error.message : 'Failed to apply backend decision.');
        return;
      }
    }

    setClaims((previous) => previous.map((claim) => (claim.id === selectedClaim.id ? { ...claim, status } : claim)));

    if (status === 'resolved') {
      setStatusMessage(`Claim ${selectedClaim.id} approved.`);
      return;
    }

    if (status === 'rejected') {
      setStatusMessage(`Claim ${selectedClaim.id} rejected.`);
      return;
    }

    setStatusMessage(`Requested more details for ${selectedClaim.id}.`);
  };

  return (
    <Card>
      <Text style={styles.heading}>Review queue</Text>
      <Text style={styles.text}>Process claimant requests with clear decision actions.</Text>

      <View style={styles.filterWrap}>
        {[
          { label: 'Pending', value: 'pending' },
          { label: 'Resolved', value: 'resolved' },
          { label: 'All', value: 'all' },
        ].map((option) => (
          <Pressable
            key={option.value}
            style={[styles.filterChip, filter === option.value ? styles.filterChipActive : null]}
            onPress={() => setFilter(option.value as 'all' | 'pending' | 'resolved')}
          >
            <Text style={filter === option.value ? styles.filterChipTextActive : styles.filterChipText}>
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Card muted>
        <Text style={styles.sectionHeading}>Lookup claim by ID</Text>
        <Text style={styles.resultMeta}>Use backend claim ID for live decision updates.</Text>
        <TextField
          label="Claim ID"
          value={lookupClaimId}
          onChangeText={setLookupClaimId}
          placeholder="e.g. 3fa85f64-5717-4562-b3fc-2c963f66afa6"
          autoCapitalize="none"
        />
        <Button label="Load claim" onPress={fetchClaim} loading={loadingLookup} variant="secondary" />
      </Card>

      {filteredClaims.length === 0 ? <EmptyState message="No claims in this filter." /> : null}

      {filteredClaims.map((claim) => (
        <Pressable key={claim.id} onPress={() => setSelectedId(claim.id)}>
          <Card muted style={selectedId === claim.id ? styles.selectedCard : undefined}>
            <View style={styles.reviewHeader}>
              <Text style={styles.resultTitle}>{claim.itemLabel}</Text>
              <StatusChip label={claim.status.replace('_', ' ')} tone={statusTone[claim.status]} />
            </View>
            <Text style={styles.resultMeta}>Claim ID: {claim.id}</Text>
            <Text style={styles.resultMeta}>Source: {claim.source}</Text>
            <Text style={styles.resultMeta}>Claimant: {claim.claimantName}</Text>
            <Text style={styles.resultText}>{claim.description}</Text>
            <Text style={styles.resultMeta}>Location: {claim.location}</Text>
          </Card>
        </Pressable>
      ))}

      {selectedClaim ? (
        <Card muted>
          <Text style={styles.sectionHeading}>Decision actions</Text>
          <Text style={styles.resultMeta}>Selected: {selectedClaim.id}</Text>
          <Button label="Approve claim" onPress={() => updateStatus('resolved')} />
          <Button label="Request info" onPress={() => updateStatus('under_review')} variant="secondary" />
          <Button label="Reject claim" onPress={() => updateStatus('rejected')} variant="secondary" />
        </Card>
      ) : null}

      <Text style={styles.statusMessage}>{statusMessage}</Text>
    </Card>
  );
};
