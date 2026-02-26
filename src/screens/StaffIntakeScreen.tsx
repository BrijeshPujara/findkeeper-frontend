import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { apiClient } from '../lib/api';

export const StaffIntakeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Ready');

  const checkApi = async () => {
    setLoading(true);
    try {
      const health = await apiClient.getHealth();
      setStatusMessage(`API OK (${health.stage}) at ${new Date(health.timestamp).toLocaleTimeString()}`);
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Staff intake</Text>
      <Text style={styles.text}>Use this shell to wire login, item create, and evidence upload in FE-101/102.</Text>

      <Pressable style={styles.button} onPress={checkApi} disabled={loading}>
        {loading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.buttonText}>Check backend health</Text>}
      </Pressable>

      <Text style={styles.statusLabel}>Status</Text>
      <Text style={styles.statusValue}>{statusMessage}</Text>
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
  button: {
    marginTop: 6,
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
