import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppText from '../AppText';
import { Icon } from '..';
import colors from '../../constants/colors';

export default function TokenPrice() {
  return (
    <View style={styles.container}>
      <AppText big>11.4188 BNB</AppText>
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
