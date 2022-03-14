/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import Screen from '../../components/Screen';
import AppText from '../../components/AppText';

import OnboardingProgress from '../../components/OnboardingProgress';
import AppButton from '../../components/AppButton';

export default function SecureWallet({ navigation }) {
  return (
    <Screen>
      <OnboardingProgress step={2} onClose={() => navigation.goBack()} />
      <View style={styles.formArea}>
        <AppText bold medium>
          Secure your wallet
        </AppText>

        <Image source={require('../../../assets/doge2locked.png')} style={styles.lockedImage} />
        <View>
          <AppText grey>
            Don't risk losing your funds. Protect your wallet by saving your seed phrase in a place you trust. It's the
            only way to recover your wallet if you get locked out of the app or get a new device.{' '}
          </AppText>
        </View>

        {/* <View style={styles.faceIdPromptContainer}></View> */}

        {/* <AppText underlined yellow bold centered style={{ marginVertical: 20 }}>
          Remind me Later
        </AppText> */}
        <View style={{ margin: 0 }}>
          <AppButton title="Start" onPress={() => navigation.navigate('seedScreenInfo')} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  formArea: {
    marginTop: 40,
    flex: 1
  },
  lockedImage: {
    width: 217,
    height: 217,
    alignSelf: 'center',
    marginVertical: 50
  },

  faceIdPromptContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
