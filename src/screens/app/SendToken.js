/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-children-prop */
import { StyleSheet, View } from 'react-native';
import React, { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import AppText from '../../components/AppText';
import ReusableBottomSheet from '../../components/extras/ReusableBottomSheet';
import ReusableAlert from '../../components/extras/ReusableAlert';
import AccountSwitcher from '../../components/home/AccountSwitcher';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from '../../components';
import AppButton from '../../components/AppButton';
import ScanBarcode from './ScanBarcode';
import { PortalProvider } from '@gorhom/portal';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import TransferComponent from '../../components/wallet/TransferComponent';
import TransactionSuccessfulComponent from '../../components/wallet/TransactionSuccessfulComponent';
import KeyPadComponent from '../../components/wallet/KeypadComponent';
import { useBalance, useTransaction } from '../../hooks/wallet';
import { useActiveAccount } from '../../hooks/accounts';
import ConfirmationComponent from '../../components/wallet/ConfirmationComponent';
import colors from '../../constants/colors';
import * as constants from '../../constants';
import FeeAdjustmentComponent from '../../components/wallet/FeeAdjustmentComponent';
import ReusableSpinner from '../../components/extras/ReusableSpinner';
import Singleton from '../../https/singleton';

export default function SendToken({
  price = '0',
  symbol = 'BNB',
  isToken = false,
  network = 'self',
  id = 'binance',
  image,
  explorer = ''
}) {
  const accountSwitcherRef = useRef(null);
  const onOpen = () => {
    accountSwitcherRef.current?.open();
  };

  const [recipient, setRecipient] = useState('');
  const [progress, setProgress] = useState(1);
  const [amountVal, setAmountVal] = useState('0');
  const [scanned, setScanned] = useState(false);
  const { balance, getBalance } = useBalance();
  const [fee, setFee] = useState(0);
  const [loading, setLoading] = useState(false);
  const [txHash, setHash] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const activeAccount = useActiveAccount();

  const [suggestedGasPrice, setSuggestedGasPrice] = useState(
    Math.floor(Math.random() * constants.MAX_SUGGESTED_GAS_PRICE)
  );
  const [suggestedTip, setSuggestedTip] = useState(Math.floor(Math.random() * constants.MAX_SUGGESTED_TIP));
  const [gasLimit, setGasLimit] = useState(constants.BASE_GAS_LIMIT);

  const barcodeBottomSheetModalRef = useRef(null);
  const barCodeSnapPoints = useMemo(() => ['100%', '100%'], []);

  const confirmationBottomSheetRef = useRef(null);
  const updateFeeBottomSheetRef = useRef(null);
  const txSuccessfulBottomSheetRef = useRef(null);

  const onSendNextButtonPress = useCallback(() => {
    confirmationBottomSheetRef.current?.open();
  });

  const onConfirmationClose = useCallback(() => {
    confirmationBottomSheetRef.current?.close();
  });

  const onScanPressHandler = useCallback(() => {
    barcodeBottomSheetModalRef.current?.present();
  }, []);

  const onScanClosePressHandler = useCallback(() => {
    barcodeBottomSheetModalRef.current?.close();
  }, []);

  const onFeeEditButtonHandler = useCallback(() => {
    updateFeeBottomSheetRef.current?.open();
  });

  const onFeeAdjustmentModalClose = useCallback(() => {
    updateFeeBottomSheetRef.current?.close();
  });

  const onSuccessShow = useCallback(() => {
    txSuccessfulBottomSheetRef.current?.open();
    onConfirmationClose();
  });

  const { transaction, createTransaction, createERC20LikeTransaction } = useTransaction();

  useEffect(() => {
    if (activeAccount) {
      getBalance(network, id, activeAccount.address);
    }
  }, [activeAccount]);

  useEffect(() => {
    if (suggestedGasPrice && suggestedTip && gasLimit) {
      const fee = gasLimit * (suggestedGasPrice + suggestedTip);
      setFee(fee / 10 ** 9);
    }
  }, [suggestedGasPrice, suggestedTip, gasLimit]);

  useEffect(() => {
    if (transaction) {
      setLoading(true);
      Singleton.getInstance()
        .broadcastTx(transaction, isToken ? network : id)
        .then(txId => {
          setHash(txId);
          setLoading(false);
          onSuccessShow();
        })
        .catch(error => {
          setLoading(false);
          setAlertMessage(error.message);
          setShowAlert(true);
          onConfirmationClose();
        });
    }
  }, [transaction]);

  const createTx = () => {
    if (!isToken) {
      createTransaction(
        id,
        activeAccount.address,
        recipient,
        parseFloat(amountVal),
        constants.BASE_GAS_LIMIT,
        suggestedGasPrice + suggestedTip,
        activeAccount.pk
      );
    } else {
      createERC20LikeTransaction(
        network,
        activeAccount.address,
        id,
        recipient,
        parseFloat(amountVal),
        constants.BASE_GAS_LIMIT,
        suggestedGasPrice + suggestedTip,
        activeAccount.pk
      );
    }
  };

  return (
    <PortalProvider>
      <BottomSheetModalProvider>
        <BottomSheetModal ref={barcodeBottomSheetModalRef} index={1} snapPoints={barCodeSnapPoints}>
          <ScanBarcode
            onCancel={onScanClosePressHandler}
            handleBarCodeScan={({ data }) => {
              setRecipient(data);
              onScanClosePressHandler();
              setScanned(true);
            }}
            scanned={scanned}
            setScanned={val => setScanned(val)}
          />
        </BottomSheetModal>
        <ReusableBottomSheet
          title="Account"
          height={600}
          ratio={0.5}
          modalRef={accountSwitcherRef}
          children={<AccountSwitcher showButtons={false} />}
        />
        <ReusableBottomSheet
          height={600}
          ratio={0.75}
          title="Confirm"
          modalRef={confirmationBottomSheetRef}
          children={
            <>
              <ConfirmationComponent
                amount={amountVal}
                symbol={symbol}
                recipient={recipient}
                price={price}
                onXPress={() => {
                  onConfirmationClose();
                  setRecipient('');
                  setProgress(1);
                }}
                image={image}
                fee={fee.toString()}
                onFeeEditPress={onFeeEditButtonHandler}
              />
              <View style={{ marginVertical: 3 }}>
                <ReusableSpinner visible={loading} />
              </View>
              <AppButton title="Send" disable={loading} onPress={createTx} />
            </>
          }
          extraStyle={{ backgroundColor: colors.otherGray }}
        />

        <ReusableBottomSheet
          extraStyle={{ backgroundColor: colors.otherGray }}
          height={200}
          ratio={0.5}
          title=""
          modalRef={updateFeeBottomSheetRef}
          children={
            <FeeAdjustmentComponent
              symbol={symbol}
              network={isToken ? network : id}
              tip={suggestedTip}
              setGasPrice={setSuggestedGasPrice}
              setGasLimit={setGasLimit}
              closeModal={onFeeAdjustmentModalClose}
              price={price}
            />
          }
        />

        <ReusableBottomSheet
          height={300}
          ratio={0.8}
          title="Transaction Successful"
          modalRef={txSuccessfulBottomSheetRef}
          children={
            <TransactionSuccessfulComponent
              explorer={explorer}
              hash={txHash}
              recipient={recipient}
              amount={amountVal}
              symbol={symbol}
            />
          }
        />

        <ReusableAlert
          visible={showAlert}
          isSuccessful={false}
          message={alertMessage}
          close={() => {
            setShowAlert(false);
            setAlertMessage('');
          }}
        />

        {progress === 1 && (
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
              <AppButton title={symbol} half outlined small />
              <TouchableOpacity
                style={{ width: 50 }}
                onPress={() => {
                  setAmountVal(balance);
                }}
              >
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
                <AppText>$ {(parseFloat(price) * parseFloat(amountVal)).toPrecision(4)} </AppText>
                <Icon name="swap-vertical" size={30} />
              </TouchableOpacity>
              <View />
            </View>
            <AppText centered grey>
              Balance: {balance} {symbol}
            </AppText>
            <KeyPadComponent
              onKeyClick={value => {
                if (amountVal.includes('.') && value === '.') {
                  return;
                }
                setAmountVal(amountVal === '0' && value !== '.' ? value : amountVal + value);
              }}
              onBackSpacePress={() => {
                setAmountVal(
                  amountVal === '0'
                    ? amountVal
                    : amountVal.length === 1
                    ? '0'
                    : amountVal.slice(0, amountVal.length - 1)
                );
              }}
            />
            <AppButton title="Next" onPress={onSendNextButtonPress} />
          </>
        )}
      </BottomSheetModalProvider>
    </PortalProvider>
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
