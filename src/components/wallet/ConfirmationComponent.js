/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Icon } from '..';
import { useActiveAccount } from '../../hooks/accounts';
import AppText from '../AppText';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginVertical: 0
  }
});

export default function ConfirmationComponent({ recipient, amount, symbol, goBack, image }) {
  const { width } = Dimensions.get('screen');
  const activeAccount = useActiveAccount();
  return (
    <View style={[styles.container, { width }]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginLeft: 0.1 * width,
          marginRight: 0.1 * width,
          width: 0.8 * width
        }}
      >
        <TouchableOpacity onPress={goBack}>
          <Icon name="chevron-left" size={30} />
        </TouchableOpacity>
        <AppText bold medium>
          {'Confirm'}
          {''}
        </AppText>
        <Image source={image && { uri: image }} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 6 }}>
        <AppText>{activeAccount?.name}</AppText>
      </View>
    </View>
  );
}
