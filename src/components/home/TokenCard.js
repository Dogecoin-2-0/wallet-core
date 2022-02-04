import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AppText from '../AppText';
import colors from '../../constants/colors';

export default function TokenCard() {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.row}>
        <AppText medium> Ethereum </AppText>
        <AppText medium> 2.5123 ETH </AppText>
      </View>
      <View style={styles.row}>
        <AppText grey> $1,722 </AppText>
        <AppText grey> 4.06% </AppText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
