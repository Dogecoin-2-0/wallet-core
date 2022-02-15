/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';
import { ImageBackground, StyleSheet, View, SafeAreaView, Image } from 'react-native';
import { Modalize } from 'react-native-modalize';

import AppButton from '../../components/AppButton';

import AppText from '../../components/AppText';
import ImportFromSeed from './ImportFromSeed';

export default function WalletSetup({ navigation }) {
  const modalRef = useRef(null);

  const onOpen = () => {
    modalRef.current?.open();
  };

  const onClose = () => {
    modalRef.current?.close();
  };
  return (
    <View style={{ flex: 0 }}>
      <ImageBackground source={require('../../../assets/wallet-setupbg.jpg')} style={styles.background}>
        <SafeAreaView style={styles.container}>
          <Image source={require('../../../assets/walletSetupLogo.png')} style={styles.logoArea} />
          <AppText white extraBig>
            Wallet Setup
          </AppText>
          <AppText white>Import an existing wallet or create a new one</AppText>

          <View style={{ marginTop: 50 }}>
            <AppButton title="Import Using Seed Phrase" outlined onPress={onOpen} />
            <AppButton title="Create New Wallet" onPress={() => navigation.navigate('createWallet')} />
          </View>
        </SafeAreaView>
      </ImageBackground>

      <Modalize ref={modalRef}>
        <ImportFromSeed />
      </Modalize>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20
  },
  logoArea: {
    margin: 50
  }
});
