/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { PortalProvider } from '@gorhom/portal';
import { BottomSheetFlatList, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Screen from '../../components/Screen';
import { Icon } from '../../components';
import { fetchTokensList, fetchChainList, fetchBlockchainInfo, fetchTokenInfo } from '../../utils';
import colors from '../../constants/colors';
import Singleton from '../../https/singleton';
import { useActiveAccount } from '../../hooks/accounts';
import TokenDetailHeader from '../../components/wallet/TokenDetailHeader';
import AppText from '../../components/AppText';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    marginVertical: 0,
    borderRadius: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 3
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
    marginVertical: 30,
    backgroundColor: colors.weirdYellow,
    width: 100,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4
  },
  avatar: {
    height: 20,
    width: 20,
    borderRadius: 25,
    backgroundColor: colors.lightSmoke,
    marginRight: 2
  }
});

export default function Swap({ navigation }) {
  const activeAccount = useActiveAccount();
  const [selectedToken1, setSelectedToken1] = useState(null);
  const [selectedToken2, setSelectedToken2] = useState(null);
  const [amount1, setAmount1] = useState('0');
  const [amount2, setAmount2] = useState('0');
  const [tokenList, setTokenList] = useState([]);

  const [minimumSwapAmount, setMinimumSwapAmount] = useState(0);

  const token1ModalRef = useRef(null);
  const token2ModalRef = useRef(null);

  useEffect(() => {
    if (!!activeAccount || activeAccount !== null)
      (async () => {
        let chainRes = await fetchChainList();
        chainRes = await Promise.all(
          chainRes.map(async item => {
            const info = await fetchBlockchainInfo(item.id);
            const balance = await Singleton.getInstance().getNativeBalance(item.id, activeAccount.address);
            return {
              symbol: info.symbol,
              network: info.symbol.toLowerCase(),
              chainName: item.id,
              balance,
              name: info.name,
              ...info
            };
          })
        );
        let tokenRes = [];

        for (const res of chainRes) {
          let allTokens = await fetchTokensList(res.chainName);
          allTokens = await Promise.all(
            allTokens.map(async x => {
              const info = await fetchTokenInfo(res.chainName, x.id);
              let balance = 0;

              try {
                balance = await Singleton.getInstance().getTokenBalance(x.network, x.id, activeAccount.address);
              } catch (error) {
                console.log(error);
              }
              return {
                symbol: info.symbol,
                network: res.network,
                chainName: res.chainName,
                balance,
                name: info.name,
                ...info
              };
            })
          );
          tokenRes = [...tokenRes, ...allTokens];
        }
        const conc = chainRes.concat(tokenRes);

        setTokenList(conc);
        setSelectedToken1(conc[0]);
        setSelectedToken2(conc[1]);
      })();
    return () => setTokenList([]);
  }, [activeAccount]);

  return (
    <PortalProvider>
      <Screen>
        <TokenDetailHeader name="Swap" goBack={() => navigation.goBack()} />
        <View style={{ marginVertical: 10, justifyContent: 'center' }}>
          <View style={styles.container}>
            <View style={styles.row}>
              <View>
                <AppText bold small>
                  From
                </AppText>
              </View>
              <View>
                <TouchableOpacity>
                  <AppText yellow small bold>
                    Use Max
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ width: '100%' }}>
              <TextInput style={{ padding: 12, fontSize: 18 }} keyboardType="number-pad" value={amount1} />
            </View>
            <View style={styles.row}>
              <View>
                <AppText small>$0.00</AppText>
              </View>
              <View>
                <TouchableOpacity style={styles.row} onPress={() => token1ModalRef.current?.present()}>
                  <View style={styles.avatar}>
                    <Image source={{ uri: selectedToken1?.image }} style={{ height: '100%', width: '100%' }} />
                  </View>
                  <View>
                    <AppText bold small>
                      {selectedToken1?.symbol}
                    </AppText>
                  </View>
                  <View>
                    <Icon name="chevron-down" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: -30 }}>
            <Pressable style={styles.cta}>
              <Icon name="swap-vertical" color={colors.yellow} />
            </Pressable>
          </View>
          <View style={styles.container}>
            <View style={styles.row}>
              <View>
                <AppText bold small>
                  To
                </AppText>
              </View>
              <View style={{ flex: 1 }} />
            </View>
            <View style={{ width: '100%' }}>
              <TextInput style={{ padding: 12, fontSize: 18 }} keyboardType="number-pad" value={amount2} />
            </View>
            <View style={styles.row}>
              <View>
                <AppText small>$0.00</AppText>
              </View>
              <View>
                <TouchableOpacity style={styles.row} onPress={() => token2ModalRef.current?.present()}>
                  <View style={styles.avatar}>
                    <Image source={{ uri: selectedToken2?.image }} style={{ height: '100%', width: '100%' }} />
                  </View>
                  <View>
                    <AppText bold small>
                      {selectedToken2?.symbol}
                    </AppText>
                  </View>
                  <View>
                    <Icon name="chevron-down" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <BottomSheetModalProvider>
          <BottomSheetModal
            style={{ paddingHorizontal: 3 }}
            ref={token1ModalRef}
            enablePanDownToClose
            snapPoints={['30%', '80%']}
            index={0}
          >
            <Screen>
              <BottomSheetFlatList
                data={tokenList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    disabled={selectedToken2.name === item.name}
                    style={styles.container}
                    onPress={() => {
                      setSelectedToken1(item);
                      token1ModalRef.current?.close();
                    }}
                  >
                    <View style={styles.row}>
                      <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }}>
                        <View style={styles.avatar}>
                          <Image source={{ uri: item.image }} style={{ height: '100%', width: '100%' }} />
                        </View>
                        <View style={{ paddingHorizontal: 4 }}>
                          <AppText padded bold small grey={selectedToken1.name === item.name}>
                            {item.name}
                          </AppText>
                        </View>
                      </View>
                      <View>{selectedToken1.name === item.name && <Icon name="check" color={colors.green} />}</View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </Screen>
          </BottomSheetModal>

          <BottomSheetModal
            style={{ paddingHorizontal: 3 }}
            ref={token2ModalRef}
            enablePanDownToClose
            snapPoints={['30%', '80%']}
            index={0}
          >
            <Screen>
              <BottomSheetFlatList
                data={tokenList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    disabled={selectedToken1.name === item.name}
                    style={styles.container}
                    onPress={() => {
                      setSelectedToken2(item);
                      token2ModalRef.current?.close();
                    }}
                  >
                    <View style={styles.row}>
                      <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }}>
                        <View style={styles.avatar}>
                          <Image source={{ uri: item.image }} style={{ height: '100%', width: '100%' }} />
                        </View>
                        <View style={{ paddingHorizontal: 4 }}>
                          <AppText padded bold small grey={selectedToken2.name === item.name}>
                            {item.name}
                          </AppText>
                        </View>
                      </View>
                      <View>{selectedToken2.name === item.name && <Icon name="check" color={colors.green} />}</View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </Screen>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </Screen>
    </PortalProvider>
  );
}
