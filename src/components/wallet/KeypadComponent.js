/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import _ from 'lodash';
import React from 'react';
import colors from '../../constants/colors';
import AppText from '../AppText';
import { Icon } from '..';

export default function KeyPadComponent({ onKeyClick, onBackSpacePress }) {
  const { width } = Dimensions.get('window');
  return (
    <View
      style={[styles.keypadContainer, { marginLeft: 0.05 * width, marginRight: 0.05 * width, width: 0.99 * width }]}
    >
      {_.map(['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'], s => (
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
            flexShrink: 0,
            flexBasis: '33.3333333333%',
            height: 68,
            width: '100%'
          }}
          key={s}
        >
          <TouchableOpacity style={{ width: '100%' }} onPress={() => onKeyClick(s)}>
            <AppText big grey>
              {s}
            </AppText>
          </TouchableOpacity>
        </View>
      ))}
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          flexShrink: 0,
          flexBasis: '33.3333333333%',
          height: 68,
          width: '100%'
        }}
      >
        <TouchableOpacity style={{ width: '100%' }} onPress={onBackSpacePress}>
          <Icon name="backspace-outline" style={{ textAlign: 'center' }} color={colors.grey} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  keypadContainer: {
    borderRadius: 5,
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 296
  }
});
