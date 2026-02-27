import { StyleSheet, Text, View } from 'react-native';
import { colors, radius } from './theme';

type StatusTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

type StatusChipProps = {
  label: string;
  tone?: StatusTone;
};

const toneStyles = {
  neutral: { backgroundColor: colors.neutralBg, color: colors.neutralText },
  success: { backgroundColor: colors.successBg, color: colors.successText },
  warning: { backgroundColor: colors.warningBg, color: colors.warningText },
  danger: { backgroundColor: colors.dangerBg, color: colors.dangerText },
  info: { backgroundColor: colors.infoBg, color: colors.infoText },
} as const;

export const StatusChip = ({ label, tone = 'neutral' }: StatusChipProps) => (
  <View style={[styles.chip, { backgroundColor: toneStyles[tone].backgroundColor }]}>
    <Text style={[styles.text, { color: toneStyles[tone].color }]}>{label}</Text>
  </View>
);

type StatusValueProps = {
  label: string;
  value: string;
};

export const StatusValue = ({ label, value }: StatusValueProps) => (
  <View style={styles.valueWrapper}>
    <Text style={styles.valueLabel}>{label}</Text>
    <Text style={styles.valueText}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  chip: {
    alignSelf: 'flex-start',
    borderRadius: radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  valueWrapper: {
    marginTop: 8,
    gap: 2,
  },
  valueLabel: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  valueText: {
    color: colors.textMuted,
  },
});
