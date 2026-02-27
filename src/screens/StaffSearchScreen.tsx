import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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
  const [statusFilter, setStatusFilter] = useState<'all' | 'unclaimed' | 'claim_pending' | 'resolved'>('all');

  const filteredResults = useMemo(() => {
    if (statusFilter === 'all') {
      return searchResults;
    }

    return searchResults.filter((item) => item.status.toLowerCase() === statusFilter);
  }, [searchResults, statusFilter]);

  return (
    <Card>
      <Text style={styles.heading}>Staff search</Text>
      <Text style={styles.text}>Search inventory and review items by status.</Text>

      <TextField
        label="Search query"
        required
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="e.g. wallet, gate B"
      />

      <Button label="Search items" onPress={runSearch} loading={searchLoading} variant="secondary" />

      <View style={styles.filterWrap}>
        {[
          { label: 'All', value: 'all' },
          { label: 'Unclaimed', value: 'unclaimed' },
          { label: 'Pending', value: 'claim_pending' },
          { label: 'Resolved', value: 'resolved' },
        ].map((filter) => (
          <Pressable
            key={filter.value}
            style={[styles.filterChip, statusFilter === filter.value ? styles.filterChipActive : null]}
            onPress={() => setStatusFilter(filter.value as 'all' | 'unclaimed' | 'claim_pending' | 'resolved')}
          >
            <Text style={statusFilter === filter.value ? styles.filterChipTextActive : styles.filterChipText}>
              {filter.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <StatusValue label="Search status" value={searchStatusMessage} />
      <Text style={styles.resultCount}>{filteredResults.length} item(s)</Text>

      {filteredResults.length === 0 ? <EmptyState message="No items found matching your filters." /> : null}

      {filteredResults.map((item) => (
        <Card key={item.id} style={localStyles.resultCard} muted>
          <Text style={styles.resultTitle}>{item.category}</Text>
          <Text style={styles.resultMeta}>#{item.id}</Text>
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
