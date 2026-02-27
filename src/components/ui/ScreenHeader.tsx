import { StyleSheet, Text, View } from 'react-native';
import { colors } from './theme';

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
};

export const ScreenHeader = ({ title, subtitle }: ScreenHeaderProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
