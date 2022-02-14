import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { PortalProvider } from '@gorhom/portal';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import TransactionCard from '../../components/wallet/TransactionCard';

const transactions = [
  {
    date: 'Mar 4 at 10:04 AM',
    type: 'Recieved BNB',
    amount: '2.078 BNB',
    price: '$647.22',
    status: 'Pending'
  },
  {
    date: 'Mar 4 at 10:44 AM',
    type: 'Recieved BNB',
    amount: '2.078 BNB',
    price: '$647.22',
    status: 'Failed'
  },
  {
    date: 'Mar 4 at 12:04 PM',
    type: 'Recieved BNB',
    amount: '2.078 BNB',
    price: '$647.22',
    status: 'Confirmed'
  },
  {
    date: 'Mar 4 at 09:04 AM',
    type: 'Recieved BNB',
    amount: '2.078 BNB',
    price: '$647.22',
    status: 'Pending'
  },
  {
    date: 'Mar 4 at 08:04 PM',
    type: 'Recieved BNB',
    amount: '2.078 BNB',
    price: '$647.22',
    status: 'Pending'
  },
  {
    date: 'Mar 4 at 07:04 PM',
    type: 'Recieved BNB',
    amount: '2.078 BNB',
    price: '$647.22',
    status: 'Failed'
  },
  {
    date: 'Mar 4 at 06:04 AM',
    type: 'Recieved BNB',
    amount: '2.078 BNB',
    price: '$647.22',
    status: 'Pending'
  }
];

export default function TokenDetails() {
  const renderHeader = () => {
    return <AppText bold> BNB</AppText>;
  };
  return (
    <PortalProvider>
      <Screen>
        <FlatList
          data={transactions}
          keyExtractor={item => item.date}
          renderItem={({ item }) => (
            <TransactionCard
              amount={item.amount}
              price={item.price}
              type={item.type}
              status={item.status}
              date={item.date}
            />
          )}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
        />
      </Screen>
    </PortalProvider>
  );
}

const styles = StyleSheet.create({});
