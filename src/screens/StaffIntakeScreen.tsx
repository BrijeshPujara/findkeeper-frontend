import { useState } from 'react';
import { View } from 'react-native';
import { SegmentedControl } from '../components/ui';
import { StaffIntakeProvider } from '../features/staff-intake/StaffIntakeContext';
import { StaffItemCaptureScreen } from './StaffItemCaptureScreen';
import { StaffReviewQueueScreen } from './StaffReviewQueueScreen';
import { StaffSearchScreen } from './StaffSearchScreen';
import { styles } from './styles/StaffIntakeScreen.styles';

const StaffIntakeScreenContent = () => {
  const [staffRoute, setStaffRoute] = useState<'capture' | 'search' | 'review'>('capture');

  return (
    <View>
      <View style={styles.routeSwitcherWrap}>
        <SegmentedControl
          options={[
            { label: 'Capture', value: 'capture' },
            { label: 'Search', value: 'search' },
            { label: 'Review', value: 'review' },
          ]}
          value={staffRoute}
          onChange={setStaffRoute}
        />
      </View>

      {staffRoute === 'capture' ? <StaffItemCaptureScreen /> : null}
      {staffRoute === 'search' ? <StaffSearchScreen /> : null}
      {staffRoute === 'review' ? <StaffReviewQueueScreen /> : null}
    </View>
  );
};

export const StaffIntakeScreen = () => (
  <StaffIntakeProvider>
    <StaffIntakeScreenContent />
  </StaffIntakeProvider>
);
