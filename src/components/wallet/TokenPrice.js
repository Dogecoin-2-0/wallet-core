/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View } from 'react-native';
import React from 'react';
import AppText from '../AppText';
import { Icon } from '..';
import colors from '../../constants/colors';

export default function TokenPrice({ symbol, balance = 0, price = 0, percentage = 0, type = 'DECREASE' }) {
  return (
    <View style={styles.container}>
      <AppText big>
        {balance} {symbol ? symbol : 'BNB'}
      </AppText>
      <View style={styles.rowArea}>
        <AppText grey>$ {price} </AppText>
        <View style={[styles.rowArea, { marginHorizontal: 25 }]}>
          <Icon
            name={type === 'INCREASE' ? 'arrow-top-right' : 'arrow-bottom-left'}
            color={type === 'INCREASE' ? colors.green : colors.red}
            size={20}
          />
          <AppText grey green={type === 'INCREASE'} red={type === 'DECREASE'}>
            {percentage}%
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
