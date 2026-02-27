import { StyleSheet, Text } from 'react-native';
import { Button, Card, EmptyState, StatusChip, StatusValue, TextField } from '../components/ui';
import { useStaffIntakeContext } from '../features/staff-intake/StaffIntakeContext';
import { styles } from './styles/StaffIntakeScreen.styles';

const getStatusTone = (status: string) => {
  const normalized = status.toLowerCase();

  if (normalized.includes('returned') || normalized.includes('resolved')) {
    return 'success' as const;
  }

  if (normalized.includes('claimed') || normalized.includes('review')) {
    return 'warning' as const;
  }

  if (normalized.includes('lost') || normalized.includes('rejected')) {
    return 'danger' as const;
  }

  return 'info' as const;
};

export const StaffSearchScreen = () => {
  const { searchQuery, searchLoading, searchStatusMessage, searchResults, setSearchQuery, runSearch } =
    useStaffIntakeContext();

  return (
    <Card>
      <Text style={styles.heading}>Staff search</Text>
      <Text style={styles.text}>Search existing items (FE-104 baseline).</Text>

      <TextField
        label="Search query"
        required
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="e.g. wallet, gate B"
      />

      <Button label="Search items" onPress={runSearch} loading={searchLoading} variant="secondary" />

      <StatusValue label="Search status" value={searchStatusMessage} />

      {searchResults.length === 0 ? <EmptyState message="No search results yet." /> : null}

      {searchResults.map((item) => (
        <Card key={item.id} style={localStyles.resultCard} muted>
          <Text style={styles.resultTitle}>{item.category}</Text>
          <Text style={styles.resultText}>ID: {item.id}</Text>
          <Text style={styles.resultText}>Location: {item.location_found}</Text>
          <Text style={styles.resultText}>Found at: {new Date(item.found_at).toLocaleString()}</Text>
          <StatusChip label={item.status} tone={getStatusTone(item.status)} />
        </Card>
      ))}
    </Card>
  );
};

const localStyles = StyleSheet.create({
  resultCard: {
    marginTop: 8,
  },
});
