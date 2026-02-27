import { StyleSheet, Text, View } from 'react-native';
import { colors } from './theme';

type EmptyStateProps = {
  message: string;
};

export const EmptyState = ({ message }: EmptyStateProps) => (
  <View style={styles.container}>
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  text: {
    color: colors.textSecondary,
  },
});
