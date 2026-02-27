import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius } from './theme';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
};

export const Button = ({ label, onPress, disabled = false, loading = false, variant = 'primary' }: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      style={[styles.base, variant === 'secondary' ? styles.secondary : styles.primary, isDisabled ? styles.disabled : null]}
      onPress={onPress}
      disabled={isDisabled}
    >
      {loading ? <ActivityIndicator color={colors.textInverse} /> : <Text style={styles.text}>{label}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    marginTop: 6,
    borderRadius: radius.md,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  disabled: {
    opacity: 0.7,
  },
  text: {
    color: colors.textInverse,
    fontWeight: '600',
  },
});
