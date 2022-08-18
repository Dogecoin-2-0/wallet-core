import { Image, StyleSheet, View, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppText from '../AppText';
import colors from '../../constants/colors';

export default function TransactionDetailPopup({ selectedId, txns = [] }) {
  // transaction status
  // change to 'confirmed' to see the ui of a successful transaction
  const status = 'Confirmed';
  const [txn, setTxn] = useState({});

  useEffect(() => {
    if (selectedId !== '0x') setTxn(txns.find(tx => tx.txId === selectedId));
  }, [selectedId]);

  return (
    <View style={styles.container}>
      <View style={styles.status}>
        <Image
          source={
            status === 'Confirmed'
              ? require('../../../assets/confirmed-icon.png')
              : require('../../../assets/failed-icon.png')
          }
        />
        <AppText bold> {status === 'failed' ? 'Failed' : 'Confirmed'}</AppText>
      </View>
      <View style={[styles.row, styles.container]}>
        <AppText> Amount</AppText>
        <View>
          <AppText>{txn.amount}</AppText>
          <AppText>
            ${''}
            {txn?.price?.toFixed(3) || 0}
          </AppText>
        </View>
      </View>
      <View style={[styles.row, styles.container]}>
        <AppText small grey>
          From
        </AppText>
        <AppText>
          {(txn.from?.slice(0, 8) + '...' + txn.from?.slice(txn.from?.length - 11, txn.from?.length)).toLowerCase()}
        </AppText>
      </View>
      <View style={[styles.row, styles.container]}>
        <AppText small grey>
          To
        </AppText>
        <AppText>
          {(txn.to?.slice(0, 8) + '...' + txn.to?.slice(txn.to?.length - 11, txn.to?.length)).toLowerCase()}
        </AppText>
      </View>
      <View style={[styles.row, styles.container]}>
        <AppText small grey>
          Date
        </AppText>
        <AppText>{txn.date}</AppText>
      </View>
      <View style={[styles.row, styles.container]}>
        <AppText small grey>
          Nonce
        </AppText>
        <AppText bold> # {txn.nonce || 0}</AppText>
      </View>

      {status != 'failed' ? (
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(txn.explorerUrl).then(console.log);
          }}
          style={styles.cta}
        >
          <AppText underlined bold yellow centered>
            View On Explorer
          </AppText>
        </TouchableOpacity>
      ) : (
        <View style={[styles.row, styles.container]}>
          <AppText>Total Amount</AppText>
          <View>
            <AppText bold>{txn.amount}</AppText>
            <AppText grey>
              ${''}
              {txn.price || 0}
            </AppText>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10
  },
  status: {
    alignItems: 'center'
    // justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  cta: {
    marginVertical: 30
  }
});
