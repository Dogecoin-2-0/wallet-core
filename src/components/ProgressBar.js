import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

export default function ProgressBar() {
  return (
    <View style={styles.bar}>
      <View />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 5,
    width: "100%",
    backgroundColor: colors.black
  }
});
