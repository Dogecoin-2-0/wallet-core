import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SvgQRCode from 'react-native-qrcode-svg';
import AppText from '../AppText';
import AppButton from '../AppButton';
export default function RecieveAsset() {
  return (
    <>
      <View style={styles.container}>
        <SvgQRCode value="Kingsley is awesome" size={250} />
        <AppText grey> Scan address to receive payment</AppText>
      </View>
      <View style={styles.row}>
        <AppButton title="xultyoh...34pm" outlined half icon="content-copy" />
        <AppButton title="Share" outlined half icon="share-variant" />
      </View>
      <AppButton icon="arrow-up" title="Send Link" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
