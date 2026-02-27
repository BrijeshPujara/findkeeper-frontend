import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  routeSwitcherWrap: {
    marginBottom: 12,
  },
  staffRouteControl: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  staffRouteButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  staffRouteButtonActive: {
    backgroundColor: '#111827',
  },
  staffRouteText: {
    color: '#111827',
    fontWeight: '600',
  },
  staffRouteTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
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
  sectionHeading: {
    color: '#111827',
    fontWeight: '700',
    marginTop: 2,
  },
  filterWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#ffffff',
  },
  filterChipActive: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  filterChipText: {
    color: '#4b5563',
    fontSize: 12,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  resultCount: {
    color: '#6b7280',
    fontSize: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  selectedCard: {
    borderColor: '#111827',
    borderWidth: 1,
  },
  statusMessage: {
    color: '#1f2937',
    marginTop: 6,
  },
  label: {
    color: '#111827',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
  },
  notesInput: {
    minHeight: 72,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#b91c1c',
    marginTop: -6,
  },
  button: {
    marginTop: 6,
    backgroundColor: '#111827',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButton: {
    marginTop: 6,
    backgroundColor: '#374151',
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
  sectionDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 8,
  },
  resultCard: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f9fafb',
    gap: 2,
  },
  resultTitle: {
    color: '#111827',
    fontWeight: '700',
  },
  resultMeta: {
    color: '#6b7280',
    fontSize: 12,
  },
  resultText: {
    color: '#374151',
  },
});
