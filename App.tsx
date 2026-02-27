import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Card, ScreenHeader, SegmentedControl } from './src/components/ui';
import { ClaimantSearchScreen } from './src/screens/ClaimantSearchScreen';
import { StaffIntakeScreen } from './src/screens/StaffIntakeScreen';
import { getApiBaseUrl } from './src/config/env';

export default function App() {
  const [journey, setJourney] = useState<'staff' | 'claimant'>('staff');
  const apiBaseUrl = useMemo(() => getApiBaseUrl(), []);

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Findkeeper"
        subtitle="Prototype-aligned UX baseline for staff intake and claimant journeys."
      />

      <Card style={styles.switchCard}>
        <Text style={styles.switchTitle}>Choose workspace</Text>
        <SegmentedControl
          options={[
            { label: 'Staff Console', value: 'staff' },
            { label: 'Claimant Portal', value: 'claimant' },
          ]}
          value={journey}
          onChange={setJourney}
        />
        <Text style={styles.switchMeta}>API: {apiBaseUrl}</Text>
      </Card>

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
    gap: 12,
  },
  switchCard: {
    gap: 10,
  },
  switchTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  switchMeta: {
    color: '#4b5563',
  },
});
