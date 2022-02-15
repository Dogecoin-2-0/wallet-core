/* eslint-disable react/no-children-prop */
import { Image, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import Swal from 'react-native-sweet-alert';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import Icon from '../../components/Icon';
import Actions from '../../components/home/Actions';
import TokenCollectiblesSwap from '../../components/home/TokenCollectiblesSwap';
import TokenCard from '../../components/home/TokenCard';
import { PortalProvider } from '@gorhom/portal';
import ReusableBottomSheet from '../../components/extras/ReusableBottomSheet';
import AccountSwitcher from '../../components/home/AccountSwitcher';
import TokenPrice from '../../components/wallet/TokenPrice';
import { fetchChainList, fetchTokensList } from '../../utils';
import colors from '../../constants/colors';

export default function Home({ navigation }) {
  const modalRef = useRef(null);
  const [list, setList] = useState([]);
  const [erc20TokensList, setERC20List] = useState([]);
  const [bep20TokenList, setBEP20List] = useState([]);

  const onOpen = () => {
    modalRef.current?.open();
  };

  const onClose = () => {
    modalRef.current?.close();
  };

  useEffect(async () => {
    try {
      const l = await fetchChainList();
      const erc20L = await fetchTokensList('ethereum');
      const bep20L = await fetchTokensList('binance');
      setList(l);
      setERC20List(erc20L);
      setBEP20List(bep20L);
    } catch (error) {
      Swal.showAlertWithOptions({
        title: 'Error',
        subTitle: error.message,
        confirmButtonTitle: 'Ok',
        confirmButtonColor: colors.red,
        style: 'error',
        cancellable: true
      });
    }
  }, []);

  return (
    <PortalProvider>
      <ReusableBottomSheet title="Account" modalRef={modalRef} children={<AccountSwitcher />} />
      <Screen>
        <View style={styles.row}>
          <View style={styles.username}>
            <TouchableOpacity style={styles.rowArea} onPress={onOpen}>
              <Image source={require('../../../assets/avatar.png')} style={styles.avatar} />
              <AppText bold yellow>
                Queen Bee
              </AppText>
              <Icon name="chevron-down" />
            </TouchableOpacity>
          </View>
          <Image source={require('../../../assets/dogeroundedLogo.png')} style={styles.logo} />
        </View>
        <TokenPrice />
        <Actions />
        <TokenCollectiblesSwap />
        <FlatList
          data={[...list, ...erc20TokensList, ...bep20TokenList]}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TokenCard
              id={item.id}
              network={item.network}
              onPress={info => navigation.navigate('tokenDetails', info)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </Screen>
    </PortalProvider>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  username: {
    justifyContent: 'flex-end'
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 5
  },
  logo: {
    width: 140,
    height: 140
  },
  rowArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  usd: {
    flexDirection: 'row'
    // justifyContent: 'space-around'
  }
});
