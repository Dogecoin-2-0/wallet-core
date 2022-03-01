/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View } from 'react-native';
import { PortalProvider } from '@gorhom/portal';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import SeedPhraseValidator from '../../components/onboarding/SeedPhraseValidator';
import OnboardingProgress from '../../components/OnboardingProgress';
import Screen from '../../components/Screen';

export default function ConfirmSeedPhrase({ navigation }) {
  const [navigationEnabled, setNavigationEnabled] = useState(false);

  return (
    <PortalProvider>
      <Screen>
        <View style={{ flex: 1 }}>
          <OnboardingProgress step={2} onClose={() => navigation.goBack()} />
          <AppText bold medium style={{ marginVertical: 10 }}>
            Confirm Seed Phrase
          </AppText>

          <AppText grey>Select each word in the order it was presented to you</AppText>
        </View>

        <View style={{ flex: 2 }}>
          {/* <SeedPhraseWraper /> */}
          <SeedPhraseValidator enableNavigate={setNavigationEnabled} />
          {/* <TemporaryValidator /> */}
        </View>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', marginVertical: 10 }}>
          <AppButton title="Continue" disable={navigationEnabled === false} />
        </View>
      </Screen>
    </PortalProvider>
  );
}
