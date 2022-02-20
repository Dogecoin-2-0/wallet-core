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
import { assetPriceKeyMap } from '../../constants/maps';
import ReusableBottomSheet from '../../components/extras/ReusableBottomSheet';
import TransactionDetailPopup from '../../components/wallet/TransactionDetailPopup';
import SendToken from './SendToken';
import RecieveAsset from '../../components/wallet/RecieveAsset';

export default function TokenDetails({ route }) {
  // modal
  const modalRef = useRef(null);
  const onOpen = () => {
    modalRef.current?.open();
  };

  const onClose = () => {
    modalRef.current?.close();
  };

  const sendModalRef = useRef(null);

  const onSendModalOpen = () => {
    sendModalRef.current?.open();
  };
  const onSendModalClose = () => {
    sendModalRef.current?.close();
  };

  const recieveModalRef = useRef(null);

  const onRecieveModalOpen = () => {
    recieveModalRef.current?.open();
  };
  const onRecieveModalClose = () => {
    recieveModalRef.current?.close();
  };

  const [txns, setTxns] = useState([]);
  const { price } = useSelector(state => state.priceReducer);
  const [priceParsed, setPriceParsed] = useState({});
  const [p, setPrice] = useState(0);

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
          trxnz[key]._chain === route.params?.network &&
          route.params?.id.toLowerCase() === trxnz[key].contract_address.toLowerCase()
        );
      return trxnz[key]._chain === route.params?.id;
    })) {
      const item = trxnz[key];
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
          id: key
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
        <TokenDetailHeader name={route.params?.name} image={route.params?.image} />

        <TokenPrice symbol={route.params?.symbol} />
        <Actions onSendIconPress={onSendModalOpen} onRecieveIconPress={onRecieveModalOpen} />
      </>
    );
  };
  return (
    <PortalProvider>
      <ReusableBottomSheet
        height={550}
        title="Recieved BNB"
        modalRef={modalRef}
        children={<TransactionDetailPopup />}
      />
      <ReusableBottomSheet height={800} title="Send Tokens" modalRef={sendModalRef} children={<SendToken />} />
      <ReusableBottomSheet height={520} title="Recieve BNB" modalRef={recieveModalRef} children={<RecieveAsset />} />
      <Screen>
        <FlatList
          data={txns}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard onPress={onOpen} {...item} symbol={route.params?.symbol} />}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
        />
      </Screen>
    </PortalProvider>
  );
}
