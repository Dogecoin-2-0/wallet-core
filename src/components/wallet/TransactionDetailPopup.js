import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppText from '../AppText';

export default function TransactionDetailPopup({ selectedId, txns = [] }) {
  // transaction status
  // change to 'confirmed' to see the ui of a successful transaction
  const status = 'confirmed';
  const [txn, setTxn] = useState({});

  useEffect(() => {
    if (selectedId !== '0x') setTxn(txns.find(tx => tx.id === selectedId));
  }, [selectedId]);

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
          <AppText>{txn.amount}</AppText>
          <AppText>
            ${''}
            {txn.price || 0}
          </AppText>
        </View>
      </View>
      <View style={styles.row}>
        <AppText small grey>
          From
        </AppText>
        <AppText>
          {(txn.from?.slice(0, 8) + '...' + txn.from?.slice(txn.from?.length - 11, txn.from?.length)).toLowerCase()}
        </AppText>
      </View>
      <View style={styles.row}>
        <AppText small grey>
          To
        </AppText>
        <AppText>
          {(txn.to?.slice(0, 8) + '...' + txn.to?.slice(txn.to?.length - 11, txn.to?.length)).toLowerCase()}
        </AppText>
      </View>
      <View style={styles.row}>
        <AppText small grey>
          Date
        </AppText>
        <AppText>{txn.date}</AppText>
      </View>
      <View style={styles.row}>
        <AppText small grey>
          Nonce
        </AppText>
        <AppText bold> # {txn.nonce || 0}</AppText>
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
