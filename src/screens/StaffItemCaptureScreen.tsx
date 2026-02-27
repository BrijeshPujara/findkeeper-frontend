import { Text } from 'react-native';
import { Button, Card, StatusValue, TextField } from '../components/ui';
import { useStaffIntakeContext } from '../features/staff-intake/StaffIntakeContext';
import { styles } from './styles/StaffIntakeScreen.styles';

export const StaffItemCaptureScreen = () => {
  const {
    loading,
    statusMessage,
    category,
    locationFound,
    foundAtIso,
    notes,
    errors,
    setCategory,
    setLocationFound,
    setFoundAtIso,
    setNotes,
    submitItem,
    checkApi,
  } = useStaffIntakeContext();

  return (
    <Card>
      <Text style={styles.heading}>Staff intake</Text>
      <Text style={styles.text}>Create a found item with required fields and deterministic validation.</Text>

      <TextField
        label="Category"
        required
        value={category}
        onChangeText={setCategory}
        placeholder="e.g. wallet"
        autoCapitalize="none"
        error={errors.category}
      />

      <TextField
        label="Location Found"
        required
        value={locationFound}
        onChangeText={setLocationFound}
        placeholder="e.g. Gate B"
        error={errors.locationFound}
      />

      <TextField
        label="Found At (ISO)"
        required
        value={foundAtIso}
        onChangeText={setFoundAtIso}
        placeholder="2026-02-27T15:00:00.000Z"
        autoCapitalize="none"
        error={errors.foundAtIso}
      />

      <TextField
        label="Notes"
        value={notes}
        onChangeText={setNotes}
        placeholder="Optional notes"
        multiline
      />

      <Button label="Submit item" onPress={submitItem} loading={loading} />

      <Button label="Check backend health" onPress={checkApi} loading={loading} variant="secondary" />

      <StatusValue label="Status" value={statusMessage} />
    </Card>
  );
};
