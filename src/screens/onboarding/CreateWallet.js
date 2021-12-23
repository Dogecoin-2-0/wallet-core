import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ProgressBar from "../../components/ProgressBar";
import Icon from "../../components/Icon";
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";

export default function CreateWallet() {
  return (
    <Screen>
      <AppText grey> This password will unlock your Air wallet only on this service.</AppText>
      <View style={styles.row}>
        <Icon name="close" size={16} />
        <ProgressBar />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
