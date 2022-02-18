/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-children-prop */
import { FlatList } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { PortalProvider } from '@gorhom/portal';
import Screen from '../../components/Screen';
import TransactionCard from '../../components/wallet/TransactionCard';
import TokenDetailHeader from '../../components/wallet/TokenDetailHeader';
import TokenPrice from '../../components/wallet/TokenPrice';
import Actions from '../../components/home/Actions';
import { fetchTransactions } from '../../utils';
import { assetPriceKeyMap, assetTxChainMap } from '../../constants/maps';
import ReusableBottomSheet from '../../components/extras/ReusableBottomSheet';
import TransactionDetailPopup from '../../components/wallet/TransactionDetailPopup';
import Icon from '../../components/Icon';
import colors from '../../constants/colors';
import AppText from '../../components/AppText';
import { View } from 'react-native';
import Singleton from '../../https/singleton';

export default function TokenDetails({ route, navigation }) {
  // modal
  const modalRef = useRef(null);
  const onOpen = () => {
    modalRef.current?.open();
  };

  const onClose = () => {
    modalRef.current?.close();
  };

  const [txns, setTxns] = useState([]);
  const { price } = useSelector(state => state.priceReducer);
  const [priceParsed, setPriceParsed] = useState({});
  const [p, setPrice] = useState(0);
  const [selectedId, setSelectedId] = useState('0x');

  useEffect(() => {
    setPriceParsed(JSON.parse(price));
  }, [price]);

  useEffect(() => {
    if (Object.keys(priceParsed).length > 0)
      setPrice(
        route.params?.isToken
          ? priceParsed[route.params?.id].price
          : priceParsed[assetPriceKeyMap[route.params?.id]].price
      );
  }, [priceParsed]);

  useEffect(async () => {
    const trxnz = await fetchTransactions('0xb69DB7b7B3aD64d53126DCD1f4D5fBDaea4fF578');
    let mutableArr = [];

    for (const key of Object.keys(trxnz).filter(key => {
      if (route.params?.isToken)
        return (
          trxnz[key]._chain === assetTxChainMap[route.params?.network] &&
          route.params?.id.toLowerCase() === trxnz[key].contract_address?.toLowerCase()
        );
      return trxnz[key]._chain === assetTxChainMap[route.params?.id];
    })) {
      const item = trxnz[key];
      setTimeout(() => {}, 10000);
      const nonce = await Singleton.getInstance().getTxNonce(
        route.params?.network === 'self' ? route.params?.id : route.params?.network,
        key
      );
      mutableArr = [
        ...mutableArr,
        {
          date: new Date(item.timestamp).toUTCString(),
          type:
            item.from.toLowerCase() === '0xb69DB7b7B3aD64d53126DCD1f4D5fBDaea4fF578'.toLowerCase()
              ? 'SENT'
              : 'RECEIVED',
          amount: `${item.amount} ${route.params?.symbol}`,
          price: (parseFloat(item.amount) * p).toPrecision(4),
          status: 'Confirmed',
          id: key,
          from: item.from,
          to: item.to,
          nonce
        }
      ];
    }
    setTxns(mutableArr);
    return () => {
      setTxns([]);
    };
  }, [p]);

  const renderHeader = () => {
    return (
      <>
        <TokenDetailHeader name={route.params?.name} image={route.params?.image} goBack={() => navigation.goBack()} />

        <TokenPrice symbol={route.params?.symbol} />
        <Actions />
      </>
    );
  };

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
      <ReusableBottomSheet
        height={550}
        title="Transaction Detail"
        modalRef={modalRef}
        children={<TransactionDetailPopup selectedId={selectedId} txns={txns} />}
      />
      <Screen>
        <FlatList
          data={txns}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TransactionCard
              onPress={() => {
                setSelectedId(item.id);
                onOpen();
              }}
              {...item}
              symbol={route.params?.symbol}
            />
          )}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
        />
      </Screen>
    </PortalProvider>
  );
}
