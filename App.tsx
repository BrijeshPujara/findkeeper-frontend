import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ClaimantSearchScreen } from './src/screens/ClaimantSearchScreen';
import { StaffIntakeScreen } from './src/screens/StaffIntakeScreen';
import { getApiBaseUrl } from './src/config/env';

export default function App() {
  const [journey, setJourney] = useState<'staff' | 'claimant'>('staff');
  const apiBaseUrl = useMemo(() => getApiBaseUrl(), []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Findkeeper MVP</Text>
      <Text style={styles.subtitle}>Backend: {apiBaseUrl}</Text>

      <View style={styles.segmentControl}>
        <Pressable
          style={[styles.segmentButton, journey === 'staff' ? styles.segmentButtonActive : null]}
          onPress={() => setJourney('staff')}
        >
          <Text style={journey === 'staff' ? styles.segmentTextActive : styles.segmentText}>Staff</Text>
        </Pressable>
        <Pressable
          style={[styles.segmentButton, journey === 'claimant' ? styles.segmentButtonActive : null]}
          onPress={() => setJourney('claimant')}
        >
          <Text style={journey === 'claimant' ? styles.segmentTextActive : styles.segmentText}>Claimant</Text>
        </Pressable>
      </View>

      {journey === 'staff' ? <StaffIntakeScreen /> : <ClaimantSearchScreen />}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7fb',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: '#4b5563',
    marginBottom: 16,
  },
  segmentControl: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  segmentButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  segmentButtonActive: {
    backgroundColor: '#111827',
  },
  segmentText: {
    color: '#111827',
    fontWeight: '600',
  },
  segmentTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
