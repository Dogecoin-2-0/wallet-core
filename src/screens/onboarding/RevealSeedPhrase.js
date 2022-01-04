import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppText from "../../components/AppText";
import SeedPhraseWraper from "../../components/onboarding/SeedPhraseWraper";
import OnboardingProgress from "../../components/OnboardingProgress";
import ProgressBar from "../../components/ProgressBar";
import Screen from "../../components/Screen";

export default function RevealSeedPhrase() {
  return (
    <Screen>
      <OnboardingProgress step={2} />
      <AppText bold medium style={{ marginVertical: 10 }}>
        Write down your seed phrase
      </AppText>

      <AppText grey>
        This is your seed phrase. Write it down on a paper and keep it in a safe place. You'll be asked to re-enter this
        phrase (in order) on the next step.
      </AppText>
      <SeedPhraseWraper />
    </Screen>
  );
}

const styles = StyleSheet.create({});
