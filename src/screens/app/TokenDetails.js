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
import { assetPriceKeyMap, assetTxChainMap } from '../../constants/maps';
import ReusableBottomSheet from '../../components/extras/ReusableBottomSheet';
import TransactionDetailPopup from '../../components/wallet/TransactionDetailPopup';
import Icon from '../../components/Icon';
import colors from '../../constants/colors';
import AppText from '../../components/AppText';
import { View } from 'react-native';
import Singleton from '../../https/singleton';
import SendToken from './SendToken';
import RecieveAsset from '../../components/wallet/RecieveAsset';
import { useAccountTxs, useActiveAccount } from '../../hooks/accounts';

export default function TokenDetails({ route, navigation }) {
  // modal
  const modalRef = useRef(null);
  const onOpen = () => {
    modalRef.current?.open();
  };

  const sendModalRef = useRef(null);

  const onSendModalOpen = () => {
    sendModalRef.current?.open();
  };

  const recieveModalRef = useRef(null);

  const onRecieveModalOpen = () => {
    recieveModalRef.current?.open();
  };

  const activeAccount = useActiveAccount();
  const txns = useAccountTxs();

  const { price } = useSelector(state => state.priceReducer);
  const [priceParsed, setPriceParsed] = useState({});
  const [p, setPrice] = useState(0);
  const [selectedId, setSelectedId] = useState('0x');
  const [mappedTxns, setMappedTxns] = useState([]);
  const [balance, setBalance] = useState('0');

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

  useEffect(() => {
    const getBalance = async () => {
      let bal = '0';
      if (activeAccount) {
        if (route.params?.isToken) {
          bal = await Singleton.getInstance().getTokenBalance(
            route.params?.network,
            route.params?.id,
            activeAccount.address
          );
        } else {
          bal = await Singleton.getInstance().getNativeBalance(route.params?.id, activeAccount.address);
        }
        setBalance(bal);
      }
    };
    getBalance();
  }, [activeAccount]);

  useEffect(async () => {
    try {
      let mutableArr = [];

      for (const key of Object.keys(txns).filter(key => {
        if (route.params?.isToken)
          return (
            txns[key]._chain === assetTxChainMap[route.params?.network] &&
            route.params?.id.toLowerCase() === txns[key].contract_address?.toLowerCase()
          );
        return txns[key]._chain === assetTxChainMap[route.params?.id];
      })) {
        const item = txns[key];
        setTimeout(() => {}, 10000);
        const nonce = await Singleton.getInstance().getTxNonce(
          route.params?.network === 'self' ? route.params?.id : route.params?.network,
          key
        );
        mutableArr = [
          ...mutableArr,
          {
            date: new Date(item.timestamp).toUTCString(),
            type: item.from.toLowerCase() === activeAccount.address.toLowerCase() ? 'SENT' : 'RECEIVED',
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
      setMappedTxns(mutableArr);
    } catch (error) {
      console.log(error.message);
    }
    return () => {
      setMappedTxns([]);
    };
  }, [p, txns]);

  const renderHeader = () => {
    return (
      <>
        <TokenDetailHeader name={route.params?.name} image={route.params?.image} goBack={() => navigation.goBack()} />

        <TokenPrice
          percentage={
            route.params?.isToken
              ? priceParsed[route.params?.id]?._percentage.toPrecision(2)
              : priceParsed[assetPriceKeyMap[route.params?.id]]?._percentage.toPrecision(2)
          }
          type={
            route.params?.isToken
              ? priceParsed[route.params?.id]?._type
              : priceParsed[assetPriceKeyMap[route.params?.id]]?._type
          }
          balance={balance}
          price={p.toPrecision(5) || 0}
          symbol={route.params?.symbol}
        />
        <Actions onSendIconPress={onSendModalOpen} onRecieveIconPress={onRecieveModalOpen} />
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
        children={
          <TransactionDetailPopup selectedId={selectedId} txns={mappedTxns} explorer={route.params?.explorer} />
        }
      />
      <ReusableBottomSheet
        ratio={0.9}
        // height={}
        title={`Send ${route.params?.symbol}`}
        modalRef={sendModalRef}
        children={
          <SendToken
            price={p.toPrecision(5)}
            isToken={route.params?.isToken}
            network={route.params?.network}
            id={route.params?.id}
            symbol={route.params?.symbol}
            image={route.params?.image}
            explorer={route.params?.explorer}
          />
        }
      />
      <ReusableBottomSheet
        // height={520}
        ratio={0.58}
        title={`Receive ${route.params?.symbol}`}
        modalRef={recieveModalRef}
        children={
          <RecieveAsset
            qrValue={activeAccount?.address ? activeAccount.address : '0x0'}
            address={activeAccount?.address ? activeAccount.address : '0x0'}
          />
        }
      />
      <Screen>
        <FlatList
          data={mappedTxns}
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
