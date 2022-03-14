/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Linking, View } from 'react-native';
import * as ethAddress from 'eth-address';
import { Icon } from '..';
import colors from '../../constants/colors';
import { useActiveAccount } from '../../hooks/accounts';
import AppButton from '../AppButton';
import AppText from '../AppText';

export default function TransactionSuccessfulComponent({ explorer, hash, recipient, amount, symbol }) {
  const activeAccount = useActiveAccount();
  const openLink = () => {
    Linking.openURL(`${explorer}tx/${hash}`).then(console.log);
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: colors.white,
          marginVertical: 16,
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Icon size={100} name="file-check-outline" color={colors.green} style={{ marginVertical: 10 }} />
        </View>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 3 }}
        >
          <View style={{ flexBasis: '40%', flexGrow: 1 }}>
            <AppText small grey>
              From
            </AppText>
          </View>
          <View style={{ flexBasis: '60%', flexGrow: 1 }}>
            <AppText medium>{ethAddress.formatEthAddress(activeAccount?.address, 8).toLowerCase()}</AppText>
          </View>
        </View>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 3 }}
        >
          <View style={{ flexBasis: '40%', flexGrow: 1 }}>
            <AppText small grey>
              To
            </AppText>
          </View>
          <View style={{ flexBasis: '60%', flexGrow: 1 }}>
            <AppText medium>{ethAddress.formatEthAddress(recipient, 8).toLowerCase()}</AppText>
          </View>
        </View>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 3 }}
        >
          <View style={{ flexBasis: '40%', flexGrow: 1 }}>
            <AppText small grey>
              Amount
            </AppText>
          </View>
          <View style={{ flexBasis: '60%', flexGrow: 1 }}>
            <AppText medium>
              {amount} {symbol}
            </AppText>
          </View>
        </View>
        <AppButton outlined title="View on explorer" onPress={openLink} />
      </View>
    </>
  );
}
