import { useState } from 'react';
import { View } from 'react-native';
import { SegmentedControl } from '../components/ui';
import { ClaimantClaimFormScreen } from './ClaimantClaimFormScreen';
import { ClaimantSearchScreen, type ClaimantMatchItem } from './ClaimantSearchScreen';
import { ClaimantTrackingScreen } from './ClaimantTrackingScreen';
import { styles } from './styles/StaffIntakeScreen.styles';

export const ClaimantPortalScreen = () => {
  const [route, setRoute] = useState<'search' | 'claim' | 'track'>('search');
  const [selectedItem, setSelectedItem] = useState<ClaimantMatchItem | null>(null);
  const [claimId, setClaimId] = useState<string | null>(null);

  const handleSelectMatch = (item: ClaimantMatchItem) => {
    setSelectedItem(item);
    setRoute('claim');
  };

  const handleClaimSubmitted = (nextClaimId: string) => {
    setClaimId(nextClaimId);
    setRoute('track');
  };

  return (
    <View>
      <View style={styles.routeSwitcherWrap}>
        <SegmentedControl
          options={[
            { label: 'Search', value: 'search' },
            { label: 'Claim', value: 'claim' },
            { label: 'Track', value: 'track' },
          ]}
          value={route}
          onChange={setRoute}
        />
      </View>

      {route === 'search' ? <ClaimantSearchScreen onSelectMatch={handleSelectMatch} /> : null}

      {route === 'claim' ? (
        <ClaimantClaimFormScreen selectedItem={selectedItem} onClaimSubmitted={handleClaimSubmitted} />
      ) : null}

      {route === 'track' ? <ClaimantTrackingScreen claimId={claimId} selectedItem={selectedItem} /> : null}
    </View>
  );
};
