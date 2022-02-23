/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-children-prop */
import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import AppText from '../../components/AppText';
import RecentTransactionCard from '../../components/wallet/RecentTransactionCard';
import AccountCard from '../../components/wallet/AccountCard';
import { PortalProvider } from '@gorhom/portal';
import ReusableBottomSheet from '../../components/extras/ReusableBottomSheet';
import AccountSwitcher from '../../components/home/AccountSwitcher';
import colors from '../../constants/colors';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import _ from 'lodash';
import { Icon } from '../../components';
import AppButton from '../../components/AppButton';
import { NavigationContainer } from '@react-navigation/native';

function TransferComponent({ setRecipient, onOpen, recipient, onNextClick, onScanPress }) {
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
          <Pressable onPress={onScanPress}>
            <Icon name={recipient.trim().length > 0 ? 'close' : 'qrcode-scan'} />
          </Pressable>
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

      {recipient.trim().length > 0 && <AppButton title="Next" onPress={onNextClick} />}

      {recipient.trim().length === 0 && [1, 2, 3].map(i => <RecentTransactionCard key={i} />)}
    </>
  );
}

function KeyPadComponent({ onKeyClick }) {
  return (
    <View style={styles.keypadContainer}>
      {_.map(['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'], s => (
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
            flexShrink: 0,
            flexBasis: '33.3333%',
            height: 68
          }}
          key={s}
        >
          <TouchableOpacity style={{ width: '100%' }} onPress={() => onKeyClick(s)}>
            <Text style={{ fontSize: 24, lineHeight: 36, color: colors.grey, textAlign: 'center' }}>{s}</Text>
          </TouchableOpacity>
        </View>
      ))}
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          flexShrink: 0,
          flexBasis: '33.3333%',
          height: 68
        }}
      >
        <TouchableOpacity style={{ width: '100%' }} onPress={() => onKeyClick('')}>
          <Icon name="backspace-outline" style={{ textAlign: 'center' }} color={colors.grey} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function SendToken({ navigation }) {
  const [progress, setProgress] = useState(1);
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

      {progress === 1 && (
        <TransferComponent
          onOpen={onOpen}
          setRecipient={setRecipient}
          recipient={recipient}
          onNextClick={() => setProgress(2)}
          onScanPress={() => navigation.navigate('scanBarcode')}
        />
      )}
      {progress === 2 && <KeyPadComponent onKeyClick={console.log} />}
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
  },
  keypadContainer: {
    borderRadius: 5,
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
    width: '100%',
    flexWrap: 'wrap',
    height: 296
  }
});
