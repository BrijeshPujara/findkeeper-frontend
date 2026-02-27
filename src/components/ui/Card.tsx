import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { colors, radius } from './theme';

type CardProps = {
  children: ReactNode;
  style?: ViewStyle;
  muted?: boolean;
};

export const Card = ({ children, style, muted = false }: CardProps) => (
  <View style={[styles.base, muted ? styles.muted : null, style]}>{children}</View>
);

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 10,
  },
  muted: {
    backgroundColor: colors.surfaceMuted,
    padding: 10,
    borderRadius: radius.md,
  },
});
