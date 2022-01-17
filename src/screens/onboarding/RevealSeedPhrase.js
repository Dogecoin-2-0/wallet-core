/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import SeedPhraseWraper from '../../components/onboarding/SeedPhraseWraper';
import OnboardingProgress from '../../components/OnboardingProgress';
import Screen from '../../components/Screen';

export default function RevealSeedPhrase({ navigation }) {
  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <OnboardingProgress step={2} />
        <AppText bold medium style={{ marginVertical: 10 }}>
          Write down your seed phrase
        </AppText>

        <AppText grey>
          This is your seed phrase. Write it down on a paper and keep it in a safe place. You&apos;ll be asked to
          re-enter this phrase (in order) on the next step.
        </AppText>
      </View>

      <View style={{ flex: 2 }}>
        <SeedPhraseWraper isInit={true} />
      </View>
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', marginVertical: 10 }}>
        <AppButton title="Continue" onPress={() => navigation.navigate('confirmSeedPhrase')} />
      </View>
    </Screen>
  );
}
