/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Pressable } from 'react-native';
import { CandleStickChart } from 'react-native-charts-wrapper';
import axios from 'axios';
import _ from 'lodash';
import ReusableAlert from './extras/ReusableAlert';
import colors from '../constants/colors';
import AppText from './AppText';

const coinGeckoClient = axios.create({ baseURL: 'https://api.coingecko.com/api/v3' });

export default function PriceChartAndLegend({ info }) {
  const width = Dimensions.get('window').width;
  const todaysDate = new Date(Date.now());
  const [ohlc, setOhlc] = useState([]);
  const [marketCap, setMarketCap] = useState(0);
  const [timeframe, setTimeframe] = useState('max');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      if (info) {
        try {
          const ohlcResponse = await coinGeckoClient.get(
            `/coins/${info.coinGeckoID}/ohlc?vs_currency=usd&days=${timeframe}`
          );
          const mCapResponse = await coinGeckoClient.get(
            `/coins/${info.coinGeckoID}/history?date=${
              todaysDate.getDate().toString() +
              '-' +
              todaysDate.getMonth().toString() +
              '-' +
              todaysDate.getFullYear().toString()
            }`
          );

          setOhlc(ohlcResponse.data);
          setMarketCap(mCapResponse.data.market_data.market_cap);
        } catch (error) {
          setErrorMessage(error.message);
          setShowError(true);
        }
      }
    })();
  }, [info, timeframe]);

  return (
    <View style={[styles.container, { width }]}>
      <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
        {_.map(
          [
            { key: 'max', title: 'All' },
            { key: '1', title: '24hr' },
            { key: '7', title: '7d' },
            { key: '30', title: '30d' },
            { key: '365', title: '365d' }
          ],
          item => (
            <Pressable
              style={{
                backgroundColor: timeframe === item.key ? colors.yellow : colors.white,
                width: 34.07,
                height: 24.47,
                borderRadius: 12.2367
              }}
              onPress={() => setTimeFrame(item.key)}
            >
              <AppText small>{item.title}</AppText>
            </Pressable>
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
});
