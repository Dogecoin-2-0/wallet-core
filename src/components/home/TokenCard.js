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
      <TouchableOpacity style={styles.container} onPress={() => onPress({ ...info, network, id })}>
        <View style={styles.avatar}>
          <Image source={{ uri: info.image }} style={{ height: '100%', width: '100%' }} />
        </View>
        <View>
          <View style={styles.row}>
            <View style={{ flexBasis: '30%', flexGrow: 1 }}>
              <AppText medium>{info.name} </AppText>
            </View>
            <View style={{ flexBasis: '10%', flex: 1 }}></View>
            <View style={{ flexBasis: '20%', flexGrow: 1 }}>
              <AppText small>
                {' '}
                {balance} {info.symbol}{' '}
              </AppText>
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ flexBasis: '30%', flexGrow: 1 }}>
              <AppText grey small>
                {' '}
                ${''}
                {info.coinGeckoID && priceParsed[info.coinGeckoID].price.toFixed(5)}
              </AppText>
            </View>
            <View style={{ flexBasis: '10%', flexGrow: 1 }}></View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexBasis: '40%', flexGrow: 1 }}>
              <View style={{ flexBasis: '90%', flexGrow: 1, flexDirection: 'row', justifyContent: 'center' }}>
                <Icon
                  name={
                    info.coinGeckoID && priceParsed[info.coinGeckoID].rateType === 'INCREASE'
                      ? 'arrow-top-right'
                      : 'arrow-bottom-left'
                  }
                  color={
                    info.coinGeckoID && priceParsed[info.coinGeckoID].rateType === 'INCREASE'
                      ? colors.green
                      : colors.red
                  }
                  size={20}
                />
                <AppText
                  green={info.coinGeckoID && priceParsed[info.coinGeckoID].rateType === 'INCREASE'}
                  red={!info.coinGeckoID || priceParsed[info.coinGeckoID].rateType === 'DECREASE'}
                  small
                >
                  {' '}
                  {info.coinGeckoID && priceParsed[info.coinGeckoID].percentageChange.toFixed(3)}
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
