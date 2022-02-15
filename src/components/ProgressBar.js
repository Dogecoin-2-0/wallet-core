/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import colors from '../constants/colors';

const screenWidth = Dimensions.get('window').width;

export default function ProgressBar({ step }) {
  return (
    <View style={{ height: 8, width: screenWidth / 1.4, backgroundColor: colors.lightSmoke, borderRadius: 10 }}>
      <View style={{ ...styles.bar, width: ((screenWidth / 2.1) * step) / 2 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 8,
    borderRadius: 8,
    backgroundColor: colors.black,
    marginHorizontal: 2
  }
});
