/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import SeedPhraseWraper from '../../components/onboarding/SeedPhraseWraper';
import OnboardingProgress from '../../components/OnboardingProgress';
import Screen from '../../components/Screen';

export default function ConfirmSeedPhrase() {
  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <OnboardingProgress step={2} />
        <AppText bold medium style={{ marginVertical: 10 }}>
          Confirm Seed Phrase
        </AppText>

        <AppText grey>Select each word in the order it was presented to you</AppText>
      </View>

      <View style={{ flex: 2 }}>
        <SeedPhraseWraper />
      </View>
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', marginVertical: 10 }}>
        <AppButton title="Continue" />
      </View>
    </Screen>
  );
}

// const styles = StyleSheet.create({});
