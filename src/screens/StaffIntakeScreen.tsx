import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { apiClient } from '../lib/api';
import { styles } from './styles/StaffIntakeScreen.styles';

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
