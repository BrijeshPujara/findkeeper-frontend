import { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { Card, EmptyState, StatusChip } from '../components/ui';
import { apiClient } from '../lib/api';
import type { ClaimData } from '../types/contracts';
import type { ClaimantMatchItem } from './ClaimantSearchScreen';
import { styles } from './styles/ClaimantSearchScreen.styles';

type ClaimantTrackingScreenProps = {
  claimId: string | null;
  selectedItem: ClaimantMatchItem | null;
};

const timeline = [
  { label: 'Claim received', note: 'We captured your submission and started review.', tone: 'info' as const },
  { label: 'Identity verification', note: 'Ownership details are being validated.', tone: 'warning' as const },
  { label: 'Staff decision', note: 'A venue staff member will approve or request details.', tone: 'neutral' as const },
];

const statusTone = {
  pending: 'warning',
  under_review: 'info',
  approved: 'success',
  rejected: 'danger',
  returned: 'success',
  expired: 'danger',
} as const;

export const ClaimantTrackingScreen = ({ claimId, selectedItem }: ClaimantTrackingScreenProps) => {
  const [claim, setClaim] = useState<ClaimData | null>(null);
  const [statusMessage, setStatusMessage] = useState('Waiting for tracking data.');

  const isUuid = useMemo(
    () => Boolean(claimId && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(claimId)),
    [claimId]
  );

  useEffect(() => {
    if (!claimId || !isUuid) {
      setClaim(null);
      setStatusMessage('Tracking preview mode. Live claim details appear when backend returns a claim ID.');
      return;
    }

    let active = true;

    const loadClaim = async () => {
      try {
        const response = await apiClient.getClaimById(claimId);
        if (!active) {
          return;
        }
        setClaim(response.data);
        setStatusMessage(`Live status: ${response.data.status.replace('_', ' ')}`);
      } catch (error) {
        if (!active) {
          return;
        }
        setClaim(null);
        setStatusMessage(error instanceof Error ? error.message : 'Unable to load claim details.');
      }
    };

    void loadClaim();

    return () => {
      active = false;
    };
  }, [claimId, isUuid]);

  if (!claimId) {
    return <EmptyState message="No claim to track yet. Submit a claim in the Claim tab." />;
  }

  return (
    <Card>
      <Text style={styles.heading}>Claim tracking</Text>
      <Text style={styles.text}>Monitor progress and next actions for your submitted claim.</Text>

      <Card muted>
        <Text style={styles.resultTitle}>Claim ID: {claimId}</Text>
        <Text style={styles.resultMeta}>Item: {selectedItem?.title || 'Selected item'}</Text>
        <Text style={styles.resultMeta}>Location: {selectedItem?.location || '—'}</Text>
        <Text style={styles.resultMeta}>{statusMessage}</Text>
      </Card>

      {claim ? <StatusChip label={claim.status.replace('_', ' ')} tone={statusTone[claim.status]} /> : null}

      {timeline.map((event) => (
        <View key={event.label} style={styles.timelineItem}>
          <StatusChip label={event.label} tone={event.tone} />
          <Text style={styles.resultMeta}>{event.note}</Text>
        </View>
      ))}
    </Card>
  );
};
