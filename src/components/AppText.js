import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

export default function AppText({
  children,
  style,
  grey,
  bold,
  underlined,
  medium,
  white,
  center,
  size,
  yellow,
  small
}) {
  return (
    <View>
      <Text
        style={[
          styles.text,
          grey && styles.grey,
          bold && styles.bold,
          underlined && styles.underlined,
          medium && styles.medium,
          yellow && styles.yellow,
          small && styles.small,
          white && styles.white,
          style
        ]}
      >
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
  white: {
    color: colors.white
  },
  bold: {
    fontFamily: "RedHatDisplay_700Bold"
  },

  underlined: {
    textDecorationLine: "underline"
  },
  medium: {
    fontSize: 18
  },
  small: {
    fontSize: 12
  },
  yellow: {
    color: colors.yellow
  }
});
