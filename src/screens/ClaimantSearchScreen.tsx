import { useState } from 'react';
import { Text } from 'react-native';
import { Button, Card, StatusValue, TextField } from '../components/ui';
import { styles } from './styles/ClaimantSearchScreen.styles';

export const ClaimantSearchScreen = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('Search will call BK-103 endpoint when wired.');

  const runSearch = () => {
    const trimmed = search.trim();
    if (trimmed.length === 0) {
      setStatus('Enter a keyword, item trait, or location to search.');
      return;
    }

    setStatus(`Search placeholder ready for query: "${trimmed}"`);
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
    </Card>
  );
};
