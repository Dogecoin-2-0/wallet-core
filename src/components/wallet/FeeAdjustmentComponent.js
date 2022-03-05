/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import _ from 'lodash';
import colors from '../../constants/colors';
import { useGasOracle } from '../../hooks/wallet';
import AppText from '../AppText';
import ReusableTabSwitch from '../extras/ReusableTabSwitch';
import RadioButton from '../forms/RadioButton';
import * as constants from '../../constants';
import { TextInput } from 'react-native-gesture-handler';
import AppButton from '../AppButton';

export default function FeeAdjustmentComponent({ network, symbol, price, closeModal, tip, setGasPrice, setGasLimit }) {
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
                    {(
                      (constants.BASE_GAS_LIMIT * parseFloat(result[indexToResultKeyMap[index]]) + tip) /
                      10 ** 9
                    ).toPrecision(4)}{' '}
                    {symbol}
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
                    {(
                      ((constants.BASE_GAS_LIMIT * parseFloat(result[indexToResultKeyMap[index]]) + tip) / 10 ** 9) *
                      parseFloat(price)
                    ).toPrecision(4)}
                  </AppText>
                </View>
              )}
              <View style={{ flexBasis: '10%', flexGrow: 1 }}>
                <RadioButton
                  selected={selected === index}
                  onSelect={() => {
                    setSelected(index);
                    setGasPrice(parseFloat(result[indexToResultKeyMap[index]]));
                    closeModal();
                  }}
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const AdvancedFeeSettingComponent = () => {
    const [innerGasLimit, changeGasLimit] = useState(constants.BASE_GAS_LIMIT);
    const [innerGasPrice, changeGasPrice] = useState(constants.MAX_SUGGESTED_GAS_PRICE);
    return (
      <>
        <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 4 }}
          >
            <View style={{ flexBasis: '40%', flexGrow: 1 }}>
              <AppText medium grey>
                Gas Limit
              </AppText>
            </View>
            <View style={{ flexBasis: '20%', flexGrow: 1 }} />
            <View style={{ flexBasis: '40%', flexGrow: 1 }}>
              <TextInput
                keyboardType="number-pad"
                style={{ backgroundColor: colors.white, borderRadius: 16, padding: 5, fontWeight: 'bold' }}
                onChangeText={val => changeGasLimit(val.trim().length > 0 ? parseFloat(val) : 0)}
                value={innerGasLimit.toString()}
              />
            </View>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 4 }}
          >
            <View style={{ flexBasis: '40%', flexGrow: 1 }}>
              <AppText medium grey>
                Gas Price (Gwei)
              </AppText>
            </View>
            <View style={{ flexBasis: '20%', flexGrow: 1 }} />
            <View style={{ flexBasis: '40%', flexGrow: 1 }}>
              <TextInput
                keyboardType="number-pad"
                style={{ backgroundColor: colors.white, borderRadius: 16, padding: 5, fontWeight: 'bold' }}
                onChangeText={val => changeGasPrice(val.trim().length > 0 ? parseFloat(val) : 0)}
                value={innerGasPrice.toString()}
              />
            </View>
          </View>
          <AppButton
            title="Ok"
            onPress={() => {
              setGasPrice(innerGasPrice);
              setGasLimit(innerGasLimit);
              closeModal();
            }}
          />
          <View style={{ flex: 1 }} />
        </View>
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ReusableTabSwitch
        tabs={[
          { title: 'Basic', component: <OracleSuggestedFeeComponent /> },
          { title: 'Advanced', component: <AdvancedFeeSettingComponent /> }
        ]}
      />
    </View>
  );
}
