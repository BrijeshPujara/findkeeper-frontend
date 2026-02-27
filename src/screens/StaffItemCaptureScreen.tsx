import { Text } from 'react-native';
import { Button, Card, StatusChip, StatusValue, TextField } from '../components/ui';
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
      <Text style={styles.text}>Log new found items with structured details and deterministic validation.</Text>

      <Card muted>
        <Text style={styles.sectionHeading}>Photo evidence</Text>
        <Text style={styles.text}>Attach item images for verification and downstream review workflows.</Text>
        <Button label="Attach image (next step)" onPress={() => undefined} variant="secondary" />
      </Card>

      <Text style={styles.sectionHeading}>Item details</Text>
      <StatusChip label="AI assist preview" tone="info" />

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
