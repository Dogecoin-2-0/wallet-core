/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from '..';
import AppText from '../AppText';
import colors from '../../constants/colors';
import ReusableAlert from '../extras/ReusableAlert';
import { fetchBlockchainInfo, fetchTokenInfo } from '../../utils';
import { assetPriceKeyMap } from '../../constants/maps';
import { useBalance } from '../../hooks/wallet';
import { useActiveAccount } from '../../hooks/accounts';

function TokenCard({ id, network, onPress }) {
  const [info, setInfo] = useState({});
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const activeAccount = useActiveAccount();
  const { balance, getBalance } = useBalance();
  const { price } = useSelector(state => state.priceReducer);
  const [priceParsed, setPriceParsed] = useState({});

  useEffect(async () => {
    try {
      const i = network === 'self' ? await fetchBlockchainInfo(id) : await fetchTokenInfo(network, id);
      setInfo(i);
    } catch (error) {
      setAlertMessage(error.message);
      setAlertVisible(true);
    }
  }, []);

  useEffect(() => {
    setPriceParsed(JSON.parse(price));
  }, [price]);

  useEffect(async () => {
    if (activeAccount) {
      getBalance(network, id, activeAccount.address);
    }
  }, [activeAccount]);

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => onPress({ ...info, isToken: network !== 'self', network, id })}
      >
        <View style={styles.avatar}>
          <Image source={{ uri: info.image }} style={{ height: '100%', width: '100%' }} />
        </View>
        <View>
          <View style={styles.row}>
            <View style={{ flexBasis: '40%', flexGrow: 1 }}>
              <AppText medium>{info.name} </AppText>
            </View>
            <View style={{ flexBasis: '60%', flexGrow: 1 }}>
              <AppText medium>
                {' '}
                {balance} {info.symbol}{' '}
              </AppText>
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ flexBasis: '20%', flexGrow: 1 }}>
              <AppText grey>
                {' '}
                ${''}
                {network === 'self'
                  ? assetPriceKeyMap[id] && priceParsed[assetPriceKeyMap[id]]
                    ? parseFloat(priceParsed[assetPriceKeyMap[id]].price).toPrecision(5)
                    : 0
                  : priceParsed[id]
                  ? parseFloat(priceParsed[id].price).toPrecision(5)
                  : 0}{' '}
              </AppText>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexBasis: '80%', flexGrow: 1 }}>
              <View style={{ flexBasis: '90%', flexGrow: 1, flexDirection: 'row', justifyContent: 'center' }}>
                <Icon
                  name={
                    network === 'self' && assetPriceKeyMap[id] && priceParsed[assetPriceKeyMap[id]]
                      ? priceParsed[assetPriceKeyMap[id]]._type === 'INCREASE'
                        ? 'arrow-top-right'
                        : 'arrow-bottom-left'
                      : priceParsed[id]
                      ? priceParsed[id]._type === 'INCREASE'
                        ? 'arrow-top-right'
                        : 'arrow-bottom-left'
                      : 'arrow-top-right'
                  }
                  color={
                    network === 'self' && assetPriceKeyMap[id] && priceParsed[assetPriceKeyMap[id]]
                      ? priceParsed[assetPriceKeyMap[id]]._type === 'INCREASE'
                        ? colors.green
                        : colors.red
                      : priceParsed[id]
                      ? priceParsed[id]._type === 'INCREASE'
                        ? colors.green
                        : colors.red
                      : colors.green
                  }
                  size={20}
                />
                <AppText
                  green={
                    network === 'self' && assetPriceKeyMap[id] && priceParsed[assetPriceKeyMap[id]]
                      ? priceParsed[assetPriceKeyMap[id]]._type === 'INCREASE'
                      : priceParsed[id]
                      ? priceParsed[id]._type === 'INCREASE'
                      : true
                  }
                  red={
                    network === 'self' && assetPriceKeyMap[id] && priceParsed[assetPriceKeyMap[id]]
                      ? priceParsed[assetPriceKeyMap[id]]._type === 'DECREASE'
                      : priceParsed[id]
                      ? priceParsed[id]._type === 'DECREASE'
                      : false
                  }
                >
                  {' '}
                  {network === 'self'
                    ? assetPriceKeyMap[id] && priceParsed[assetPriceKeyMap[id]]
                      ? parseFloat(priceParsed[assetPriceKeyMap[id]]._percentage).toPrecision(2)
                      : 0
                    : priceParsed[id]
                    ? parseFloat(priceParsed[id]._percentage).toPrecision(2)
                    : 0}
                  {'%'}
                </AppText>
              </View>
              <View style={{ flexBasis: '10%', flexGrow: 1 }} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <ReusableAlert
        isSuccessful={false}
        visible={alertVisible}
        message={alertMessage}
        close={() => {
          setAlertVisible(false);
          setAlertMessage('');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    marginVertical: 5,
    flexDirection: 'row'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 2,
    paddingRight: 2
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 25,
    backgroundColor: colors.lightSmoke, // 'rgba(255, 255, 255, 0.1)',
    marginRight: 20
  }
});

TokenCard.propTypes = {
  id: PropTypes.string.isRequired,
  onPress: PropTypes.func
};

export default TokenCard;
