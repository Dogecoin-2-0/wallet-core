/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Pressable } from 'react-native';
import { CandlestickChart } from 'react-native-wagmi-charts';
import axios from 'axios';
import _ from 'lodash';
import ReusableAlert from './extras/ReusableAlert';
import colors from '../constants/colors';
import AppText from './AppText';

const coinGeckoClient = axios.create({ baseURL: 'https://api.coingecko.com/api/v3' });

export default function PriceChartAndLegend({ info }) {
  const width = Dimensions.get('screen').width;
  const todaysDate = new Date(Date.now());
  const [ohlc, setOhlc] = useState([]);
  const [marketCap, setMarketCap] = useState(0);
  const [timeframe, setTimeframe] = useState('1');
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
          setMarketCap(mCapResponse.data.market_data.market_cap.usd);
        } catch (error) {
          setErrorMessage(error.message);
          setShowError(true);
        }
      }
    })();
  }, [info, timeframe]);

  return (
    <View style={[styles.container, { width }]}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
          padding: 0
        }}
      >
        {_.map(
          [
            { key: '1', title: '24hr' },
            { key: '7', title: '7d' },
            { key: '30', title: '30d' },
            { key: '365', title: '365d' }
          ],
          item => (
            <Pressable
              style={{
                backgroundColor: timeframe === item.key ? colors.yellow : colors.white,
                width: 44.07,
                height: 34.47,
                borderRadius: 12.2367,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => setTimeframe(item.key)}
              key={item.key}
            >
              <AppText small bold>
                {item.title}
              </AppText>
            </Pressable>
          )
        )}
      </View>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CandlestickChart.Provider
          data={_.map(ohlc, item => ({
            timestamp: item[0],
            open: item[1],
            high: item[2],
            low: item[3],
            close: item[4]
          }))}
        >
          <CandlestickChart width={width} height={200}>
            <CandlestickChart.Candles positiveColor={colors.green} negativeColor={colors.red} />
          </CandlestickChart>
        </CandlestickChart.Provider>
      </View>
      <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingHorizontal: 7,
            paddingVertical: 7,
            borderTopColor: colors.weirdWhite,
            borderWidth: 0.91
          }}
        >
          <View>
            <AppText grey small>
              Website
            </AppText>
          </View>
          <View style={{ flexGrow: 1 }}></View>
          <View>
            <AppText grey small>
              {info.website}
            </AppText>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingHorizontal: 7,
            paddingVertical: 7,
            borderTopColor: colors.weirdWhite,
            borderWidth: 0.91
          }}
        >
          <View>
            <AppText grey small>
              Explorer
            </AppText>
          </View>
          <View style={{ flexGrow: 1 }}></View>
          <View>
            <AppText grey small>
              {info.explorer}
            </AppText>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingHorizontal: 7,
            paddingVertical: 7,
            borderTopColor: colors.weirdWhite,
            borderTopWidth: 0.91
          }}
        >
          <View>
            <AppText grey small>
              Market Capitalization
            </AppText>
          </View>
          <View style={{ flexGrow: 1 }}></View>
          <View>
            <AppText grey small>
              ${marketCap}
            </AppText>
          </View>
        </View>
      </View>
      <ReusableAlert
        visible={showError}
        isSuccessful={false}
        message={errorMessage}
        close={() => {
          setShowError(false);
          setErrorMessage('');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    padding: 0
  }
});
