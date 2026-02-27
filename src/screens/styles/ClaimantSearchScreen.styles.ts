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
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  resultTitle: {
    color: '#111827',
    fontWeight: '700',
    flex: 1,
  },
  resultMeta: {
    color: '#4b5563',
    fontSize: 13,
  },
  resultAction: {
    color: '#1d4ed8',
    fontWeight: '600',
    marginTop: 2,
  },
  timelineItem: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    padding: 10,
    gap: 6,
    backgroundColor: '#ffffff',
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
