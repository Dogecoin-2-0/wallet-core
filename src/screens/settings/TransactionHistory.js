import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TokenDetailHeader from '../../components/wallet/TokenDetailHeader';
import Screen from '../../components/Screen';
import TransactionCard from '../../components/wallet/TransactionCard';

export default function TransactionHistory() {
  const data = [
    {
      price: '65.00',
      amount: '6.00',
      date: 'JAN 5 at 6:00 PM',
      type: 'SENT',
      status: 'Pending',
      symbol: 'BNB'
    },
    {
      price: '65.00',
      amount: '6.00',
      date: '2020-01-31',
      type: 'RECIEVED',
      status: 'Pending',
      symbol: 'BNB'
    },
    {
      price: '65.00',
      amount: '6.00',
      date: '2020-01-41',
      type: 'SENT',
      status: 'Failed',
      symbol: 'BNB'
    },
    {
      price: '65.00',
      amount: '6.00',
      date: '2020-01-056',
      type: 'RECIEVED',
      status: 'Pending',
      symbol: 'BNB'
    },
    {
      price: '65.00',
      amount: '6.00',
      date: '2020-01-05',
      type: 'SENT',
      status: 'Confirmed',
      symbol: 'BNB'
    },
    {
      price: '65.00',
      amount: '6.00',
      date: '2020-01-04',
      type: 'SENT',
      status: 'Confirmed',
      symbol: 'BNB'
    }
  ];
  return (
    <Screen>
      <FlatList
        data={data}
        keyExtractor={item => item.date}
        ListHeaderComponent={<TokenDetailHeader name="Transactions" />}
        renderItem={({ item }) => <TransactionCard {...item} />}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});
