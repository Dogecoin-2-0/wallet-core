import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import AppText from '../../components/AppText';
import Screen from '../../components/Screen';
import RecentTransactionCard from '../../components/wallet/RecentTransactionCard';
import AccountCard from '../../components/wallet/AccountCard';
import { PortalProvider } from '@gorhom/portal';
import ReusableBottomSheet from '../../components/extras/ReusableBottomSheet';
import AccountSwitcher from '../../components/home/AccountSwitcher';
import colors from '../../constants/colors';
import { TextInput } from 'react-native-gesture-handler';
import { Icon } from '../../components';

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
        <View style={styles.inputArea}>
          <AppText bold padded>
            To
          </AppText>

          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Search, public address(0x), or ENS" />
            <Icon name="qrcode-scan" />
          </View>

          <AppText centered blue bold underlined>
            Transfer Between My Accounts
          </AppText>
        </View>

        <AppText bold medium padded>
          Recent
        </AppText>

        {[1, 2, 3, 4].map(i => (
          <RecentTransactionCard key={i} />
        ))}
      </Screen>
    </PortalProvider>
  );
}

const styles = StyleSheet.create({
  inputArea: {
    padding: 10,
    backgroundColor: colors.white
  },
  inputContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: colors.lightSmoke,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  input: {
    width: '90%',
    padding: 15
  }
});
