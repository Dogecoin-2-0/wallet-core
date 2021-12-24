import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "../constants/colors";
import AppText from "./AppText";

export default function AppButton({ title, outline, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <AppText bold underlined white>
        {title}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.yellow,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    alignSelf: "center"
  }
});
