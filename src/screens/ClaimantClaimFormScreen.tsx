import { useMemo, useState } from 'react';
import { Text } from 'react-native';
import { Button, Card, StatusChip, StatusValue, TextField } from '../components/ui';
import { apiClient } from '../lib/api';
import type { ClaimantMatchItem } from './ClaimantSearchScreen';
import { styles } from './styles/ClaimantSearchScreen.styles';

type ClaimantClaimFormScreenProps = {
  selectedItem: ClaimantMatchItem | null;
  onClaimSubmitted: (claimId: string) => void;
};

export const ClaimantClaimFormScreen = ({ selectedItem, onClaimSubmitted }: ClaimantClaimFormScreenProps) => {
  const [claimantName, setClaimantName] = useState('');
  const [claimantEmail, setClaimantEmail] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Complete claim details to continue verification.');

  const itemId = useMemo(() => selectedItem?.id ?? '', [selectedItem]);

  const submitClaim = async () => {
    if (!itemId) {
      setStatus('Select an item from Search before submitting a claim.');
      return;
    }

    if (claimantName.trim().length === 0 || claimantEmail.trim().length === 0 || description.trim().length === 0) {
      setStatus('Name, email, and ownership details are required.');
      return;
    }

    setLoading(true);
    try {
      const idempotencyKey = `claim-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;

      const response = await apiClient.submitClaim({
        itemId,
        claimantName: claimantName.trim(),
        claimantEmail: claimantEmail.trim(),
        description: description.trim(),
      }, idempotencyKey);

      const claimId =
        typeof response === 'object' &&
        response !== null &&
        'data' in response &&
        typeof (response as { data?: { id?: string } }).data?.id === 'string'
          ? (response as { data: { id: string } }).data.id
          : `claim-${Date.now().toString(36)}`;

      setStatus(`Claim submitted successfully: ${claimId}`);
      onClaimSubmitted(claimId);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Claim submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Text style={styles.heading}>Claim submission</Text>
      <Text style={styles.text}>Provide contact and ownership details to verify item return eligibility.</Text>

      <Card muted>
        <Text style={styles.resultTitle}>{selectedItem ? selectedItem.title : 'No item selected yet'}</Text>
        <Text style={styles.resultMeta}>Item ID: {itemId || 'Select from Search tab'}</Text>
        <Text style={styles.resultMeta}>Location: {selectedItem?.location || '—'}</Text>
      </Card>

      <StatusChip label="verification required" tone="warning" />

      <TextField
        label="Full name"
        required
        value={claimantName}
        onChangeText={setClaimantName}
        placeholder="e.g. Alex Johnson"
      />

      <TextField
        label="Email"
        required
        value={claimantEmail}
        onChangeText={setClaimantEmail}
        placeholder="alex@example.com"
        autoCapitalize="none"
      />

      <TextField
        label="Ownership details"
        required
        value={description}
        onChangeText={setDescription}
        placeholder="Describe unique details not visible publicly."
        multiline
      />

      <Button label="Submit claim" onPress={submitClaim} loading={loading} />

      <StatusValue label="Status" value={status} />
    </Card>
  );
};
