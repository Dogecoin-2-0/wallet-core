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
        <Icon size={200} name="file-check" color={colors.green} style={{ marginVertical: 10 }} />
        <AppButton outlined title="View on explorer" onPress={openLink} />
      </View>
    </>
  );
}
