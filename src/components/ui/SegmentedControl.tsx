import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from './theme';

type SegmentedOption<TValue extends string> = {
  label: string;
  value: TValue;
};

type SegmentedControlProps<TValue extends string> = {
  options: SegmentedOption<TValue>[];
  value: TValue;
  onChange: (nextValue: TValue) => void;
};

export const SegmentedControl = <TValue extends string>({
  options,
  value,
  onChange,
}: SegmentedControlProps<TValue>) => (
  <View style={styles.container}>
    {options.map((option) => {
      const active = option.value === value;

      return (
        <Pressable
          key={option.value}
          style={[styles.button, active ? styles.buttonActive : null]}
          onPress={() => onChange(option.value)}
        >
          <Text style={active ? styles.textActive : styles.text}>{option.label}</Text>
        </Pressable>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  button: {
    flex: 1,
    borderRadius: radius.sm,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  textActive: {
    color: colors.textInverse,
    fontWeight: '600',
  },
});
