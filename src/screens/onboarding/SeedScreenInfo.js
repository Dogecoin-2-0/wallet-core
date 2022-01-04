import React, { useState } from "react";
import { Image, StyleSheet, Switch, Text, View } from "react-native";
import ProgressBar from "../../components/ProgressBar";
import Icon from "../../components/Icon";
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";

import OnboardingProgress from "../../components/OnboardingProgress";
import colors from "../../constants/colors";
import AppButton from "../../components/AppButton";
import SecurityLevel from "../../components/onboarding/SecurityLevel";

export default function SeedScreenInfo() {
  return (
    <Screen>
      <OnboardingProgress step={2} />
      <View style={styles.title}>
        <AppText bold medium>
          Secure your wallet
        </AppText>
      </View>
      <AppText>Secure your wallet's seed phrase</AppText>
      <View style={styles.row}>
        <Icon name={"help-circle-outline"} size={20} color="#4C70D0" />
        <AppText small underlined style={{ color: "#4C70D0", marginHorizontal: 20, marginVertical: 20 }}>
          Why it's Important?
        </AppText>
      </View>

      <AppText grey> Write down your seed phraase on a piece of paper and store in a safe place</AppText>

      <View style={styles.row}>
        <AppText small grey>
          {" "}
          Security Level:{" "}
        </AppText>
        <AppText small style={{ color: "blue" }}>
          Very strong
        </AppText>
      </View>
      <SecurityLevel />

      <View>
        <AppText grey small>
          {" "}
          Risks Are:{" "}
        </AppText>
        <AppText grey small>
          {" "}
          - You lose it{" "}
        </AppText>
        <AppText grey small>
          - You forgot where you put it{" "}
        </AppText>
        <AppText grey small>
          {" "}
          - Someone else finds it{" "}
        </AppText>
        <AppText grey small style={{ marginVertical: 10 }}>
          {" "}
          Other options: Doesn't have to be on paper!
        </AppText>
        <AppText grey small>
          - Store in a bank vault
        </AppText>
        <AppText grey small>
          - Store in a safe
        </AppText>
        <AppText small grey>
          {" "}
          - Store in Multiple Secret places
        </AppText>
      </View>
      <View style={{ marginTop: 100 }}>
        <AppButton title="Start" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 40,
    marginBottom: 20
  },
  row: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center"
  }
});
