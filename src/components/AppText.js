import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

export default function AppText({ children, style, grey, bold, medium, center, size, color }) {
  return (
    <View>
      <Text style={[styles.text, grey && styles.grey, bold && styles.bold, medium && styles.medium, style]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.black,
    fontSize: 16,
    paddingVertical: 2,
    fontFamily: "RedHatDisplay_400Regular"
  },
  grey: {
    color: colors.grey
  },
  bold: {
    fontFamily: "RedHatDisplay_700Bold"
  },

  medium: {
    fontSize: 18
  }
});
