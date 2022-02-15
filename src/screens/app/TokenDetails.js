import { FlatList, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { PortalProvider } from '@gorhom/portal';
import Screen from '../../components/Screen';
import TransactionCard from '../../components/wallet/TransactionCard';
import TokenDetailHeader from '../../components/wallet/TokenDetailHeader';
import TokenPrice from '../../components/wallet/TokenPrice';
import Actions from '../../components/home/Actions';
import ReusableBottomSheet from '../../components/extras/ReusableBottomSheet';
import AccountSwitcher from '../../components/home/AccountSwitcher';
import TransactionDetailPopup from '../../components/wallet/TransactionDetailPopup';

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

export default function TokenDetails({ route }) {
  const modalRef = useRef(null);
  const onOpen = () => {
    modalRef.current?.open();
  };

  const onClose = () => {
    modalRef.current?.close();
  };
  const renderHeader = () => {
    return (
      <>
        <TokenDetailHeader name={route.params?.name} image={route.params?.image} />

        <TokenPrice symbol={route.params?.symbol} />
        <Actions />
      </>
    );
  };
  return (
    <PortalProvider>
      <ReusableBottomSheet title="Recieved BNB" modalRef={modalRef} children={<TransactionDetailPopup />} />
      <Screen>
        <FlatList
          data={transactions}
          keyExtractor={item => item.date}
          renderItem={({ item }) => <TransactionCard onPress={onOpen} {...item} />}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
        />
      </Screen>
    </PortalProvider>
  );
}
