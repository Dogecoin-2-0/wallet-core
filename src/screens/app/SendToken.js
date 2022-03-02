/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-children-prop */
import { Pressable, StyleSheet, View } from 'react-native';
import React, { useRef, useMemo, useCallback, useState } from 'react';
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
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import TransferComponent from '../../components/wallet/TransferComponent';
import KeyPadComponent from '../../components/wallet/KeypadComponent';

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

  const barcodeBottomSheetModalRef = useRef(null);
  const barCodeSnapPoints = useMemo(() => ['100%', '100%'], []);

  const onScanPressHandler = useCallback(() => {
    barcodeBottomSheetModalRef.current?.present();
  }, []);

  const onScanClosePressHandler = useCallback(() => {
    barcodeBottomSheetModalRef.current?.close();
  }, []);
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal ref={barcodeBottomSheetModalRef} index={1} snapPoints={barCodeSnapPoints}>
        <ScanBarcode
          onCancel={onScanClosePressHandler}
          onHide={val => setDisplayBarcode(val)}
          handleBarCodeScanned={({ type, data }) => {
            setRecipient(data);
            setScanned(true);
          }}
          scanned={scanned}
          setScanned={setScanned}
        />
      </BottomSheetModal>
      <ReusableBottomSheet
        title="Account"
        height={600}
        ratio={0.5}
        modalRef={accountSwitcherRef}
        children={<AccountSwitcher showButtons={false} />}
      />

      {progress === 1 && !displayBarcode && (
        <TransferComponent
          onOpen={onOpen}
          setRecipient={setRecipient}
          recipient={recipient}
          onNextClick={() => setProgress(2)}
          onScanPress={onScanPressHandler}
          onClosePress={() => setRecipient('')}
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
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
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
