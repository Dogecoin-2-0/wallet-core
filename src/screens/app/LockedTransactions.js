/* eslint-disable react/no-children-prop */
/* eslint-disable react-native/no-inline-styles */
import { PortalProvider } from '@gorhom/portal';
import { formatEthAddress } from 'eth-address';
import { Interface } from '@ethersproject/abi';
import { AddressZero } from '@ethersproject/constants';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import CountDown from 'react-native-countdown-component';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import AppText from '../../components/AppText';
import { Icon } from '../../components';
import ReusableBottomSheet from '../../components/extras/ReusableBottomSheet';
import ReusableSpinner from '../../components/extras/ReusableSpinner';
import ReusableAlert from '../../components/extras/ReusableAlert';
import Screen from '../../components/Screen';
import TokenDetailHeader from '../../components/wallet/TokenDetailHeader';
import colors from '../../constants/colors';
import { useActiveAccount } from '../../hooks/accounts';
import { fetchBlockchainInfo, fetchLockedTransactions } from '../../utils';
import { chainIdMap } from '../../constants/maps';
import erc20Abi from '../../assets/ERC20ABI.json';
import { _jsonRpcRequest } from '../../https/rpc';
import AppButton from '../../components/AppButton';
import Singleton from '../../https/singleton';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  icon: {
    marginRight: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: colors.ghostWhite,
    textAlign: 'center',
    alignItems: 'center'
  },
  cta: {
    marginVertical: 30
  }
});

export default function LockedTransactions({ navigation }) {
  const activeAccount = useActiveAccount();
  const [txList, setTxList] = useState([]);
  const [selectedTx, setSelectedTx] = useState(null);
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const modalRef = useRef(null);

  const showInfoModal = () => {
    modalRef.current?.open();
  };

  const cancelTransaction = () => {
    setIsLoading(true);
    Singleton.getInstance()
      .cancelLockedTx(selectedTx, activeAccount.pk)
      .then(hash => {
        modalRef.current?.close();
        setIsLoading(false);
        setIsSuccessful(true);
        setMessage(`Transaction completed with hash: ${hash}`);
        setShowAlert(true);
        setTxList(txList.filter(tx => selectedTx.id !== tx.id));
      })
      .catch(err => {
        modalRef.current?.close();
        setIsLoading(false);
        setIsSuccessful(false);
        setMessage(err.message);
        setShowAlert(true);
      });
  };

  const proceedWithTransaction = () => {
    setIsLoading(true);
    Singleton.getInstance()
      .processLockedTx(selectedTx, activeAccount.pk)
      .then(hash => {
        modalRef.current?.close();
        setIsSuccessful(true);
        setIsLoading(false);
        setMessage(`Transaction completed with hash: ${hash}`);
        setShowAlert(true);
        setTxList(txList.filter(tx => selectedTx.id !== tx.id));
      })
      .catch(err => {
        modalRef.current?.close();
        setIsLoading(false);
        setIsSuccessful(false);
        setMessage(err.message);
        setShowAlert(true);
      });
  };

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
      return () => clearInterval(interval);
    }, [])
  );

  useEffect(() => {
    if (!!activeAccount || activeAccount !== null) {
      (async () => {
        let res = await fetchLockedTransactions(activeAccount.walletId);
        res = await Promise.all(
          res.map(async item => {
            if (item.token === AddressZero) {
              const network = Object.keys(chainIdMap).find(val => chainIdMap[val] === parseInt(item.chainId));
              const networkInfo = await fetchBlockchainInfo(network);
              return { ...item, symbol: networkInfo.symbol };
            } else {
              const abiInterface = new Interface(erc20Abi);
              const data = abiInterface.getSighash('symbol()');
              const network = Object.keys(chainIdMap).find(val => chainIdMap[val] === parseInt(item.chainId));
              let symbol = await _jsonRpcRequest(network, 'eth_call', [{ to: item.token, data }, 'latest']);
              [symbol] = abiInterface.decodeFunctionResult('symbol()', symbol);
              return { ...item, symbol };
            }
          })
        );
        setTxList(res);
      })();
    }
  }, [activeAccount]);

  const renderEmpty = () => {
    return (
      <>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20
          }}
        >
          <Icon name="gauge-empty" size={200} color={colors.lightSmoke} />
          <AppText grey bold big size={30}>
            No Data
          </AppText>
        </View>
      </>
    );
  };

  return (
    <PortalProvider>
      <Screen>
        <TokenDetailHeader name="Locked Transactions" goBack={() => navigation.goBack()} />
        <View style={{ marginVertical: 10 }}>
          <FlatList
            data={txList}
            keyExtractor={item => item.id}
            ListEmptyComponent={renderEmpty}
            renderItem={({ item }) => (
              <View style={styles.container}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedTx(item);
                    showInfoModal();
                  }}
                >
                  <View style={styles.row}>
                    <View style={{ flexGrow: 1 }}>
                      <Icon name="lock" style={styles.icon} size={20} />
                    </View>
                    <View style={{ flexBasis: '65%', flexGrow: 1 }}>
                      <AppText bold small>
                        Locked until {new Date(parseInt(item.lockTime)).toDateString()}
                      </AppText>
                    </View>
                    <View style={{ flexBasis: '25%' }}>
                      <AppText small>
                        {item.amount} {item.symbol}
                      </AppText>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={{ flexBasis: '12%' }} />
                    <View style={{ flexBasis: '95%' }}>
                      <AppText small>
                        Fee: {''}
                        {item.fee}
                      </AppText>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </Screen>
      <ReusableBottomSheet
        ratio={0.9}
        // height={}
        title="Locked Transaction Detail"
        modalRef={modalRef}
        children={
          <>
            {!!selectedTx && (
              <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Icon size={100} name="timer-outline" />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <CountDown
                    id={selectedTx.id}
                    until={Math.floor(parseInt(selectedTx.lockTime) / 1000 - now)}
                    digitStyle={{ backgroundColor: colors.lightSmoke }}
                  />
                </View>
                <View style={[styles.row, styles.container]}>
                  <AppText> Amount</AppText>
                  <View>
                    <AppText>
                      {selectedTx.amount} {selectedTx.symbol}
                    </AppText>
                  </View>
                </View>
                <View style={[styles.row, styles.container]}>
                  <AppText small grey>
                    From
                  </AppText>
                  <AppText>{formatEthAddress(selectedTx.from)}</AppText>
                </View>
                <View style={[styles.row, styles.container]}>
                  <AppText small grey>
                    To
                  </AppText>
                  <AppText>{formatEthAddress(selectedTx.to)}</AppText>
                </View>
                <View style={[styles.row, styles.container]}>
                  <AppText small grey>
                    Date
                  </AppText>
                  <AppText>{selectedTx.createdAt}</AppText>
                </View>
                <TouchableOpacity onPress={cancelTransaction} style={styles.cta}>
                  <AppText underlined bold yellow centered>
                    Cancel Transaction
                  </AppText>
                </TouchableOpacity>
                <AppButton onPress={proceedWithTransaction} title="Proceed With Transaction" />
                {isLoading && (
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <ReusableSpinner visible={isLoading} />
                  </View>
                )}
              </View>
            )}
          </>
        }
      />
      <ReusableAlert
        isSuccessful={isSuccessful}
        visible={showAlert}
        message={message}
        close={() => {
          setShowAlert(false);
          setMessage('');
        }}
      />
    </PortalProvider>
  );
}
