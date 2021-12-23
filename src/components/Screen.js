import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";

export default function Screen({ children }) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  }
});
