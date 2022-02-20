/* eslint-disable react/no-children-prop */
import { StyleSheet, View } from 'react-native';
import React, { useRef, useState } from 'react';
import AppText from '../../components/AppText';
import RecentTransactionCard from '../../components/wallet/RecentTransactionCard';
import AccountCard from '../../components/wallet/AccountCard';
import { PortalProvider } from '@gorhom/portal';
import ReusableBottomSheet from '../../components/extras/ReusableBottomSheet';
import AccountSwitcher from '../../components/home/AccountSwitcher';
import colors from '../../constants/colors';
import { TextInput } from 'react-native-gesture-handler';
import { Icon } from '../../components';
import AppButton from '../../components/AppButton';

function TransferComponent({ setRecipient, onOpen, recipient }) {
  return (
    <>
      <AccountCard onPress={onOpen} />
      <View style={styles.inputArea}>
        <AppText bold padded>
          To
        </AppText>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setRecipient}
            placeholder="Search, public address(0x), or ENS"
            value={recipient}
          />
          <Icon name={recipient.trim().length > 0 ? 'close' : 'qrcode-scan'} />
        </View>

        {recipient.trim().length === 0 && (
          <AppText centered blue bold underlined padded>
            Transfer Between My Accounts
          </AppText>
        )}
      </View>

      {recipient.trim().length === 0 && (
        <AppText bold medium padded>
          Recent
        </AppText>
      )}

      {recipient.trim().length > 0 && <AppButton title="Next" />}

      {recipient.trim().length === 0 && [1, 2, 3].map(i => <RecentTransactionCard key={i} />)}
    </>
  );
}

export default function SendToken() {
  const accountSwitcherRef = useRef(null);
  const onOpen = () => {
    accountSwitcherRef.current?.open();
  };

  const onClose = () => {
    accountSwitcherRef.current?.close();
  };

  const [recipient, setRecipient] = useState('');

  return (
    <PortalProvider>
      <ReusableBottomSheet title="Account" height={500} modalRef={accountSwitcherRef} children={<AccountSwitcher />} />

      <TransferComponent onOpen={onOpen} setRecipient={setRecipient} recipient={recipient} />
      {/* </Screen> */}
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
