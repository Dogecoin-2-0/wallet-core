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
import Singleton from '../../https/singleton';

function TokenCard({ id, network, onPress }) {
  const [info, setInfo] = useState({});
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [balance, setBalance] = useState('0');
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
    const bal =
      network === 'self'
        ? await Singleton.getInstance().getNativeBalance(id, '0xb69DB7b7B3aD64d53126DCD1f4D5fBDaea4fF578')
        : await Singleton.getInstance().getTokenBalance(network, id, '0xb69DB7b7B3aD64d53126DCD1f4D5fBDaea4fF578');
    setBalance(bal);
  }, []);

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
            <AppText medium> {info.name} </AppText>
            <AppText medium>
              {' '}
              {balance} {info.symbol}{' '}
            </AppText>
          </View>
          <View style={styles.row}>
            <AppText grey>
              {' '}
              ${' '}
              {network === 'self'
                ? assetPriceKeyMap[id] && priceParsed[assetPriceKeyMap[id]]
                  ? parseFloat(priceParsed[assetPriceKeyMap[id]].price).toPrecision(5)
                  : 0
                : priceParsed[id]
                ? parseFloat(priceParsed[id].price).toPrecision(5)
                : 0}{' '}
            </AppText>
            <View style={styles.row}>
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
