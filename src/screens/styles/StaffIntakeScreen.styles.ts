import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
