import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import AppText from '../AppText';
import AppButton from '../AppButton';
import { Icon } from '..';
import colors from '../../constants/colors';
import { Pressable } from 'react-native';

export default function TransactionDetailPopup() {
  // transaction status
  // change to 'confirmed' to see the ui of a successful transaction
  const status = 'failed';

  return (
    <View style={styles.container}>
      <View style={styles.status}>
        <Image
          source={
            status === 'failed'
              ? require('../../../assets/failed-icon.png')
              : require('../../../assets/confirmed-icon.png')
          }
        />
        <AppText bold> {status === 'failed' ? 'Failed' : 'Confirmed'}</AppText>
      </View>
      <View style={styles.row}>
        <AppText> Amount</AppText>
        <View>
          <AppText> 0.5673 BNB</AppText>
          <AppText>$133,2530</AppText>
        </View>
      </View>
      <View style={styles.row}>
        <AppText small grey>
          From
        </AppText>
        <AppText> bc1qsh...uyupm</AppText>
      </View>
      <View style={styles.row}>
        <AppText small grey>
          To
        </AppText>
        <AppText> bc1qsh...uyupm</AppText>
      </View>
      <View style={styles.row}>
        <AppText small grey>
          Date
        </AppText>
        <AppText> bc1qsh...uyupm</AppText>
      </View>
      <View style={styles.row}>
        <AppText small grey>
          Nonce
        </AppText>
        <AppText> #0</AppText>
      </View>

      {status != 'failed' ? (
        <TouchableOpacity onPress={() => alert('view on main net')} style={styles.cta}>
          <AppText underlined bold yellow centered>
            View On Mainnet
          </AppText>
        </TouchableOpacity>
      ) : (
        <View style={styles.row}>
          <AppText>Total Amount</AppText>
          <View>
            <AppText bold> 1.34272 BNB</AppText>
            <AppText grey>$3296.35</AppText>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  status: {
    alignItems: 'center'
    // justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },

  cta: {
    marginVertical: 30
  }
});
