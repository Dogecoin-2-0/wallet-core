import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { PortalProvider } from '@gorhom/portal';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import TransactionCard from '../../components/wallet/TransactionCard';
import { Icon } from '../../components';
import colors from '../../constants/colors';
import TokenDetailHeader from '../../components/wallet/TokenDetailHeader';

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
    return (
      <>
        <TokenDetailHeader name="BNB" />

        <AppText big> 11.4188 BNB</AppText>
        <View style={styles.rowArea}>
          <AppText grey>$ 8,391.14</AppText>
          <View style={[styles.rowArea, { marginHorizontal: 25 }]}>
            <Icon name="arrow-top-right" color={colors.green} size={20} />
            <AppText grey green>
              {'9.97'}%
            </AppText>
          </View>
        </View>
      </>
    );
  };
  return (
    <PortalProvider>
      <Screen>
        <FlatList
          data={transactions}
          keyExtractor={item => item.date}
          renderItem={({ item }) => <TransactionCard {...item} />}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
        />
      </Screen>
    </PortalProvider>
  );
}

const styles = StyleSheet.create({
  rowArea: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
