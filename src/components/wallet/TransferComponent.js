/* eslint-disable react-native/no-inline-styles */
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import _ from 'lodash';
import colors from '../../constants/colors';
import AccountCard from './AccountCard';
import AppText from '../AppText';
import { Icon } from '..';
import AppButton from '../AppButton';
import { useAccounts, useActiveAccount } from '../../hooks/accounts';
import { FlatList } from 'react-native-gesture-handler';

export default function TransferComponent({ setRecipient, recipient, onNextClick, onScanPress, onClosePress }) {
  const accounts = useAccounts();
  const activeAccount = useActiveAccount();
  return (
    <>
      <AccountCard />
      <View style={styles.inputArea}>
        <AppText bold>To</AppText>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setRecipient}
            placeholder="Search, public address(0x), or ENS"
            value={recipient}
          />
          <Pressable
            onPress={() => {
              if (recipient.trim().length > 0) onClosePress();
              else onScanPress();
            }}
          >
            <Icon name={recipient.trim().length > 0 ? 'close' : 'qrcode-scan'} />
          </Pressable>
        </View>

        {recipient.trim().length === 0 && accounts.length > 0 && (
          <AppText centered blue bold underlined padded>
            Transfer Between My Accounts
          </AppText>
        )}
      </View>

      {recipient.trim().length > 0 && <AppButton title="Next" onPress={onNextClick} />}

      <FlatList
        data={_.filter(accounts, item => item.id !== activeAccount?.id)}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <AccountCard
            account={item}
            onPress={() => {
              setRecipient(item.address);
            }}
          />
        )}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 7 }}>
            <Icon name="gauge-empty" size={100} color={colors.lightSmoke} />
            <AppText medium grey>
              No Data
            </AppText>
          </View>
        )}
      />
    </>
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
