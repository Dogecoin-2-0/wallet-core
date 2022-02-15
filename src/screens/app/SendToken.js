import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppText from '../../components/AppText';
import Screen from '../../components/Screen';
import RecentTransactionCard from '../../components/wallet/RecentTransactionCard';

export default function SendToken() {
  return (
    <Screen>
      <View>
        <AppText centered blue bold underlined>
          Transfer Between by Accounts
        </AppText>

        <AppText bold medium>
          Recent
        </AppText>

        {[1, 2, 3, 4].map(i => (
          <RecentTransactionCard key={i} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({});
