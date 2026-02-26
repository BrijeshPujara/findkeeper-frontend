import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

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
    <View style={styles.container}>
      <Text style={styles.heading}>Claimant search</Text>
      <Text style={styles.text}>This screen maps to FE-201/202 and BK-201+ flows.</Text>

      <TextInput
        placeholder="e.g. black wallet, gate B, Tuesday"
        style={styles.input}
        value={search}
        onChangeText={setSearch}
      />

      <Pressable style={styles.button} onPress={runSearch}>
        <Text style={styles.buttonText}>Search items</Text>
      </Pressable>

      <Text style={styles.statusLabel}>Status</Text>
      <Text style={styles.statusValue}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    gap: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
  },
  text: {
    color: '#4b5563',
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
  },
  button: {
    marginTop: 4,
    backgroundColor: '#111827',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  statusLabel: {
    marginTop: 8,
    fontWeight: '600',
    color: '#111827',
  },
  statusValue: {
    color: '#1f2937',
  },
});
