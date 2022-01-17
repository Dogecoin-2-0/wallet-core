import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

export default function AppText({
  children,
  style,
  grey,
  bold,
  underlined,
  medium,
  white,
  centered,
  size,
  yellow,
  small,
  extraBig
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
          centered && styles.centered,
          extraBig && styles.extraBig,
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
    fontFamily: 'RedHatDisplay_400Regular'
  },
  grey: {
    color: colors.grey
  },
  white: {
    color: colors.white
  },
  bold: {
    fontFamily: 'RedHatDisplay_700Bold'
  },

  underlined: {
    textDecorationLine: 'underline'
  },
  centered: {
    textAlign: 'center'
  },
  medium: {
    fontSize: 18
  },
  extraBig: {
    fontSize: 48,
    marginVertical: 10
  },
  small: {
    fontSize: 14
  },
  yellow: {
    color: colors.yellow
  }
});
