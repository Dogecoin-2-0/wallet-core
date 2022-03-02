import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../../constants/colors';

export default function TransferComponent() {
  function TransferComponent({ setRecipient, onOpen, recipient, onNextClick, onScanPress, onClosePress }) {
    return (
      <>
        <AccountCard onPress={onOpen} />
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

          {recipient.trim().length === 0 && (
            <AppText centered blue bold underlined padded>
              Transfer Between My Accounts
            </AppText>
          )}
        </View>

        {recipient.trim().length === 0 && (
          <AppText bold medium>
            Recent
          </AppText>
        )}

        {recipient.trim().length > 0 && <AppButton title="Next" onPress={onNextClick} />}

        {recipient.trim().length === 0 && [1, 2, 3].map(i => <RecentTransactionCard key={i} />)}
      </>
    );
  }
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
