import { StyleSheet, View, Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import React, { useState, useEffect } from 'react';
import SvgQRCode from 'react-native-qrcode-svg';
import AppText from '../AppText';
import AppButton from '../AppButton';
import ReusableAlert from '../extras/ReusableAlert';

export default function RecieveAsset({ qrValue = '0x', address = '0x' }) {
  const [alertDisplayed, setAlertDisplayed] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const copyAddress = () => Clipboard.setString(address);
  const openAlert = message => {
    setAlertMessage(message);
    setAlertDisplayed(true);
  };
  const closeAlert = () => {
    setAlertDisplayed(false);
    setAlertMessage('');
  };
  const share = () => {
    Share.share({ message: address.toLowerCase() }).then(share => {
      console.log('Share result: ', { ...share });
    });
  };

  useEffect(() => {
    const subscription = Clipboard.addClipboardListener(({ content }) => {
      openAlert(`${content} copied!`);
      setTimeout(() => closeAlert(), 4000);
    });

    return () => {
      Clipboard.removeClipboardListener(subscription);
    };
  }, []);

  return (
    <>
      <View style={styles.container}>
        <SvgQRCode value={qrValue} size={250} />
        <AppText grey> Scan address to receive payment</AppText>
      </View>
      <View style={styles.row}>
        <AppButton
          title={(address.slice(0, 8) + '...' + address.slice(address.length - 11, address.length)).toLowerCase()}
          outlined
          half
          icon="content-copy"
          onPress={copyAddress}
        />
        <AppButton title="Share" outlined half icon="share-variant" onPress={share} />
        <ReusableAlert close={closeAlert} isSuccessful={true} message={alertMessage} visible={alertDisplayed} />
      </View>
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
