/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View } from 'react-native';
import React from 'react';
import AppText from '../AppText';
import { Icon } from '..';
import colors from '../../constants/colors';

export default function TokenPrice({ symbol }) {
  return (
    <View style={styles.container}>
      <AppText big>11.4188 {symbol ? symbol : 'BNB'}</AppText>
      <View style={styles.rowArea}>
        <AppText grey>$ 8,391.14</AppText>
        <View style={[styles.rowArea, { marginHorizontal: 25 }]}>
          <Icon name="arrow-top-right" color={colors.green} size={20} />
          <AppText grey green>
            {'9.97'}%
          </AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowArea: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  container: {
    marginVertical: 10
  }
});
