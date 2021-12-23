import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ProgressBar from "../../components/ProgressBar";
import Icon from "../../components/Icon";
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import AppTextInput from "../../components/forms/AppTextInput";
import AppPasswordInput from "../../components/forms/AppPasswordInput";

export default function CreateWallet() {
  const step = 1;
  return (
    <Screen>
      <View style={styles.row}>
        <Icon name="close" size={20} />
        <ProgressBar step={step} />
        <AppText yellow small>
          {step} / 3
        </AppText>
      </View>
      <View style={styles.formArea}>
        <AppText bold medium>
          Create Password
        </AppText>
        <AppText grey> This password will unlock your Air wallet only on this service.</AppText>

        <AppPasswordInput label="New password" icon="eye" placeholder="********" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20
  },
  formArea: {
    marginTop: 40
  }
});
