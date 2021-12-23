import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ProgressBar from "../../components/ProgressBar";
import Icon from "../../components/Icon";
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";

export default function CreateWallet() {
  const step = 1;
  return (
    <Screen>
      <View style={styles.row}>
        <Icon name="close" size={20} />
        <ProgressBar step={step} />
        <AppText style={{ textAlign: "center" }}> {step} / 3</AppText>
      </View>
      <View style={styles.formArea}>
        <AppText bold> Create Password</AppText>
        <AppText grey> This password will unlock your Air wallet only on this service.</AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  formArea: {
    marginTop: 40
  }
});
