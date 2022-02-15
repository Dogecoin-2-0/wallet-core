import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import AppText from '../../components/AppText';
import Screen from '../../components/Screen';
import RecentTransactionCard from '../../components/wallet/RecentTransactionCard';
import AccountCard from '../../components/wallet/AccountCard';
import { PortalProvider } from '@gorhom/portal';
import ReusableBottomSheet from '../../components/extras/ReusableBottomSheet';
import AccountSwitcher from '../../components/home/AccountSwitcher';

export default function SendToken() {
  const accountSwitcherRef = useRef(null);
  const onOpen = () => {
    accountSwitcherRef.current?.open();
  };

  const onClose = () => {
    accountSwitcherRef.current?.close();
  };
  return (
    <PortalProvider>
      <ReusableBottomSheet
        title="Account"
        // height={400}
        modalRef={accountSwitcherRef}
        children={<AccountSwitcher />}
      />
      <Screen>
        <AppText bold padded>
          From
        </AppText>
        <AccountCard onPress={onOpen} />
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
    </PortalProvider>
  );
}

const styles = StyleSheet.create({});
