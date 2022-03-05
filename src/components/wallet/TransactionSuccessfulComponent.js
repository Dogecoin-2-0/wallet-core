/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Linking, View } from 'react-native';
import { Icon } from '..';
import colors from '../../constants/colors';
import AppButton from '../AppButton';

export default function TransactionSuccessfulComponent({ explorer, hash }) {
  const openLink = () => {
    Linking.openURL(`${explorer}${hash}`).then(console.log);
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: colors.white,
          marginVertical: 16,
          justifyContent: 'space-between'
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Icon size={200} name="check-circle-outline" color={colors.green} style={{ marginVertical: 10 }} />
        </View>
        <AppButton outlined title="View on explorer" onPress={openLink} />
      </View>
    </>
  );
}
