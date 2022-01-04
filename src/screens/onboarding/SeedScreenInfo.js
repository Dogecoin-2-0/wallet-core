import React, { useState } from "react";
import { Image, StyleSheet, Switch, Text, View } from "react-native";
import ProgressBar from "../../components/ProgressBar";
import Icon from "../../components/Icon";
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";

import OnboardingProgress from "../../components/OnboardingProgress";
import colors from "../../constants/colors";
import AppButton from "../../components/AppButton";

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
        <Icon name={"question-mark"} size={20} color={"blue"} />
        <AppText small underlined style={{ color: "blue", marginHorizontal: 20, marginVertical: 20 }}>
          Why it's Important?
        </AppText>
      </View>

      <AppText grey> Write down your seed phraase on a piece of paper and store in a safe place</AppText>

      <View style={styles.row}>
        <AppText small> Security Level: </AppText>
        <AppText small style={{ color: "blue" }}>
          Very Strong
        </AppText>
      </View>

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

        <AppText grey small>
          {" "}
          Other options: Doesn't have to be on paper!
        </AppText>
      </View>
      <View style={{ marginTop: 10 }}>
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
