import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AppText from '../AppText';
import AppButton from '../AppButton';
import { Icon } from '..';
import colors from '../../constants/colors';
import { Pressable } from 'react-native';

export default function TransactionDetailPopup() {
  return (
    <View style={styles.container}>
      <View style={styles.status}>
        <Image source={require('../../../assets/confirmed-icon.png')} />
        <AppText bold> Confirmed</AppText>
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

      <TouchableOpacity>
        <AppText underlined bold yellow>
          View On Mainnet
        </AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  status: {
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  }
});
