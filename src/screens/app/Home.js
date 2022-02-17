/* eslint-disable react/no-children-prop */
import { Image, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import Icon from '../../components/Icon';
import Actions from '../../components/home/Actions';
import TokenCollectiblesSwap from '../../components/home/TokenCollectiblesSwap';
import TokenCard from '../../components/home/TokenCard';
import { PortalProvider } from '@gorhom/portal';
import ReusableBottomSheet from '../../components/extras/ReusableBottomSheet';
import ReusableAlert from '../../components/extras/ReusableAlert';
import AccountSwitcher from '../../components/home/AccountSwitcher';
import TokenPrice from '../../components/wallet/TokenPrice';
import { fetchChainList, fetchTokensList } from '../../utils';
import Singleton from '../../https/singleton';

export default function Home({ navigation }) {
  const modalRef = useRef(null);
  const [list, setList] = useState([]);
  const [erc20TokensList, setERC20List] = useState([]);
  const [bep20TokenList, setBEP20List] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { price } = useSelector(state => state.priceReducer);
  const [priceParsed, setPriceParsed] = useState({});
  const [balance, setBalance] = useState('0');

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
      setAlertMessage(error.message);
      setShowAlert(true);
    }
  }, []);

  useEffect(async () => {
    try {
      const bal = await Singleton.getInstance().getNativeBalance(
        'binance',
        '0xb69DB7b7B3aD64d53126DCD1f4D5fBDaea4fF578'
      );
      setBalance(bal);
    } catch (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
    }
  }, []);

  useEffect(() => {
    setPriceParsed(JSON.parse(price));
  }, [price]);

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
        <TokenPrice
          price={priceParsed['binancecoin']?.price.toPrecision(5) || 0}
          percentage={priceParsed['binancecoin']?._percentage.toPrecision(2) || 0}
          type={priceParsed['binancecoin']?._type}
          balance={balance}
        />
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
        <ReusableAlert
          message={alertMessage}
          visible={showAlert}
          isSuccessful={false}
          close={() => {
            setShowAlert(false);
            setAlertMessage('');
          }}
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
  }
});
