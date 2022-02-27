/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-children-prop */
import { Pressable, StyleSheet, View } from 'react-native';
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
import ScanBarcode from './ScanBarcode';

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

function KeyPadComponent({ onKeyClick, onBackSpacePress }) {
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
            <AppText big>{s}</AppText>
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
        <TouchableOpacity style={{ width: '100%' }} onPress={onBackSpacePress}>
          <Icon name="backspace-outline" style={{ textAlign: 'center' }} color={colors.grey} />
        </TouchableOpacity>
      </View>
    </View>
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
  const [progress, setProgress] = useState(1);
  const [amountVal, setAmountVal] = useState('0');
  const [displayBarcode, setDisplayBarcode] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);

  return (
    <PortalProvider>
      <ReusableBottomSheet
        title="Account"
        height={600}
        ratio={0.5}
        // rati
        modalRef={accountSwitcherRef}
        children={<AccountSwitcher showButtons={false} />}
      />

      {progress === 1 && !displayBarcode && (
        <TransferComponent
          onOpen={onOpen}
          setRecipient={setRecipient}
          recipient={recipient}
          onNextClick={() => setProgress(2)}
          onScanPress={() => setDisplayBarcode(true)}
          onClosePress={() => setRecipient('')}
        />
      )}

      {displayBarcode && (
        <ScanBarcode
          onCancel={() => setDisplayBarcode(false)}
          onHide={val => setDisplayBarcode(val)}
          handleBarCodeScanned={({ type, data }) => {
            setRecipient(data);
            setScanned(true);
          }}
          scanned={scanned}
          setScanned={setScanned}
        />
      )}

      {progress === 2 && (
        <>
          <View style={styles.row}>
            <View />
            <View />
            <AppButton title="BNB" half outlined icon="chevron-down" small />
            <TouchableOpacity>
              <AppText yellow small>
                Use Max
              </AppText>
            </TouchableOpacity>
          </View>
          <TextInput
            value={amountVal}
            style={{ textAlign: 'center', fontSize: 30 }}
            onChangeText={setAmountVal}
            editable={false}
          />
          <View style={styles.row}>
            <View />
            <TouchableOpacity style={[styles.row2, { backgroundColor: '#f5f5f5', height: 40, width: 121 }]}>
              <AppText>$ 488.40 </AppText>
              <Icon name="swap-vertical" size={30} />
            </TouchableOpacity>
            <View />
          </View>
          <AppText centered grey>
            Balance: 11.4188 BNB
          </AppText>
          <KeyPadComponent
            onKeyClick={value => {
              setAmountVal(amountVal === '0' ? value : amountVal + value);
            }}
            onBackSpacePress={() => {
              setAmountVal(
                amountVal === '0' ? amountVal : amountVal.length === 1 ? '0' : amountVal.slice(0, amountVal.length - 1)
              );
            }}
          />
          <AppButton title="Next" />
        </>
      )}
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
  },
  row: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center'
  },
  row2: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100
  }
});
