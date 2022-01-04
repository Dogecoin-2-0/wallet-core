import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";

export default function SecurityLevel() {
  return (
    <View style={styles.container}>
      <View style={styles.bar} />
      <View style={styles.bar} />
      <View style={styles.bar} />
      <View style={styles.bar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20
  },

  bar: {
    backgroundColor: colors.green,
    height: 8,
    width: "10%",
    margin: 3,
    borderRadius: 5
  }
});
