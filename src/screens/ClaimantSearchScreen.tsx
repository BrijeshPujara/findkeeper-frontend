import { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Button, Card, EmptyState, StatusChip, StatusValue, TextField } from '../components/ui';
import { styles } from './styles/ClaimantSearchScreen.styles';

export type ClaimantMatchItem = {
  id: string;
  title: string;
  location: string;
  foundAt: string;
};

type ClaimantSearchScreenProps = {
  onSelectMatch?: (item: ClaimantMatchItem) => void;
};

export const ClaimantSearchScreen = ({ onSelectMatch }: ClaimantSearchScreenProps) => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('Search by item trait, location, or date to discover possible matches.');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const mockResults = useMemo(
    () => [
      { id: 'preview-01', title: 'Black wallet', location: 'Gate B', foundAt: '2026-02-26T10:30:00.000Z' },
      { id: 'preview-02', title: 'Phone with blue case', location: 'Lobby', foundAt: '2026-02-25T18:10:00.000Z' },
      { id: 'preview-03', title: 'Set of keys', location: 'Terminal desk', foundAt: '2026-02-24T08:45:00.000Z' },
    ],
    []
  );

  const filteredResults = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (query.length === 0) {
      return [];
    }

    return mockResults.filter(
      (item) => item.title.toLowerCase().includes(query) || item.location.toLowerCase().includes(query)
    );
  }, [mockResults, search]);

  const runSearch = () => {
    const trimmed = search.trim();
    if (trimmed.length === 0) {
      setStatus('Enter a keyword, item trait, or location to search.');
      return;
    }

    setStatus(`Showing preview matches for "${trimmed}". Claim flow connects in FE-202.`);
  };

  return (
    <Card>
      <Text style={styles.heading}>Claimant search</Text>
      <Text style={styles.text}>This screen maps to FE-201/202 and BK-201+ flows.</Text>

      <TextField
        label="Search"
        placeholder="e.g. black wallet, gate B, Tuesday"
        value={search}
        onChangeText={setSearch}
      />

      <Button label="Search items" onPress={runSearch} />

      <StatusValue label="Status" value={status} />

      {filteredResults.length === 0 ? (
        <EmptyState message="No items found yet. Try broader terms like color, category, or location." />
      ) : (
        filteredResults.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => {
              setSelectedItemId(item.id);
              onSelectMatch?.(item);
            }}
          >
            <Card muted>
              <View style={styles.resultHeader}>
                <Text style={styles.resultTitle}>{item.title}</Text>
                <StatusChip label={selectedItemId === item.id ? 'selected' : 'possible match'} tone="info" />
              </View>
              <Text style={styles.resultMeta}>Location: {item.location}</Text>
              <Text style={styles.resultMeta}>Found: {new Date(item.foundAt).toLocaleDateString()}</Text>
              <Text style={styles.resultAction}>This might be mine</Text>
            </Card>
          </Pressable>
        ))
      )}
    </Card>
  );
};
