import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { PortalProvider } from '@gorhom/portal';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import TransactionCard from '../../components/wallet/TransactionCard';

export default function TokenDetails() {
  return (
    <PortalProvider>
      <Screen >
        <AppText bold> BNB</AppText>

        <TransactionCard />
      </Screen>
    </PortalProvider>
  );
}

const styles = StyleSheet.create({});
