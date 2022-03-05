/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import _ from 'lodash';
import colors from '../../constants/colors';
import { useGasOracle } from '../../hooks/wallet';
import AppText from '../AppText';
import ReusableTabSwitch from '../extras/ReusableTabSwitch';
import RadioButton from '../forms/RadioButton';

export default function FeeAdjustmentComponent({ network, symbol, price, setFee, setGasLimit }) {
  const { result, getProposedFees } = useGasOracle();
  const [selected, setSelected] = useState(0);

  const indexToResultKeyMap = {
    0: 'SafeGasPrice',
    1: 'ProposeGasPrice',
    2: 'FastGasPrice'
  };

  useEffect(() => {
    getProposedFees(network);
  }, []);

  const OracleSuggestedFeeComponent = () => (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }}
      >
        {_.map(['Slow', 'Average', 'Fast'], (key, index) => (
          <View
            key={key}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: colors.white,
              borderRadius: 16,
              height: 68,
              marginVertical: 6
            }}
          >
            <View
              style={{
                flexDirection: 'column',
                flexGrow: 1,
                flexBasis: '33.3333%',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <View style={{ flexBasis: '40%', flexGrow: 1 }}>
                <AppText medium grey>
                  {key}
                </AppText>
              </View>
              {!!result && (
                <View style={{ flexBasis: '60%', flexGrow: 1 }}>
                  <AppText medium grey>
                    {(parseFloat(result[indexToResultKeyMap[index]]) / 10 ** 9).toPrecision(4)} {symbol}
                  </AppText>
                </View>
              )}
            </View>
            <View style={{ flexBasis: '5%', flexGrow: 1 }} />
            <View
              style={{
                flexBasis: '42%',
                flexGrow: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 5
              }}
            >
              {!!result && (
                <View style={{ flexBasis: '90%', flexGrow: 1 }}>
                  <AppText medium>
                    ${''}
                    {((parseFloat(result[indexToResultKeyMap[index]]) / 10 ** 9) * parseFloat(price)).toPrecision(4)}
                  </AppText>
                </View>
              )}
              <View style={{ flexBasis: '10%', flexGrow: 1 }}>
                <RadioButton
                  selected={selected === index}
                  onSelect={() => {
                    setSelected(index);
                  }}
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const AdvancedFeeSettingComponent = () => (
    <>
      <AppText medium>Lorem Ipsum..... Errrr Nope!</AppText>
    </>
  );
  return (
    <>
      <ReusableTabSwitch
        tabs={[
          { title: 'Basic', component: <OracleSuggestedFeeComponent /> },
          { title: 'Advanced', component: <AdvancedFeeSettingComponent /> }
        ]}
      />
    </>
  );
}
