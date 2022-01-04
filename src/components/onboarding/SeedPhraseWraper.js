import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../constants/colors";

export default function SeedPhraseWraper() {
  return <TouchableOpacity style={styles.container}></TouchableOpacity>;
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    backgroundColor: colors.lightSmoke
  }
});
