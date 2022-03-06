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
  green,
  red,
  centered,
  yellow,
  blue,
  small,
  big,
  extraBig,
  padded
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
          blue && styles.blue,
          big && styles.big,
          green && styles.green,
          red && styles.red,
          padded && styles.padded,
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
  green: {
    color: colors.green
  },
  white: {
    color: colors.white
  },
  red: {
    color: colors.red
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
    fontSize: 12
  },
  yellow: {
    color: colors.yellow
  },
  blue: {
    color: colors.blue
  },
  big: {
    fontSize: 30
  },
  padded: {
    marginVertical: 10
  }
});
