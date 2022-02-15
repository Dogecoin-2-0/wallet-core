import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import AppText from '../../components/AppText';
import Screen from '../../components/Screen';
import RecentTransactionCard from '../../components/wallet/RecentTransactionCard';
import AccountCard from '../../components/wallet/AccountCard';

export default function SendToken() {
  return (
    <Screen>
      <AppText bold padded>
        From
      </AppText>
      <AccountCard />
      <AppText bold padded>
        To
      </AppText>
      <View>
        <AppText centered blue bold underlined padded>
          Transfer Between My Accounts
        </AppText>

        <AppText bold medium padded>
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
