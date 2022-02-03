/* eslint-disable react-native/no-color-literals */
import './global';
import 'react-native-get-random-values'; // This should be imported first to provide `crypto.getRandomValues` to components that depend on it
import '@ethersproject/shims'; // Polyfill for ethers.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateWallet from './src/screens/onboarding/CreateWallet';

import AppLoading from 'expo-app-loading';
import store from './src/redux/store';
import { Provider } from 'react-redux';
import {
  useFonts,
  RedHatDisplay_400Regular,
  RedHatDisplay_400Regular_Italic,
  RedHatDisplay_500Medium,
  RedHatDisplay_700Bold,
  RedHatDisplay_700Bold_Italic
} from '@expo-google-fonts/red-hat-display';
import WalletSetup from './src/screens/onboarding/WalletSetup';
import SecureWallet from './src/screens/onboarding/SecureWallet';
import SeedScreenInfo from './src/screens/onboarding/SeedScreenInfo';
import RevealSeedPhrase from './src/screens/onboarding/RevealSeedPhrase';
import ConfirmSeedPhrase from './src/screens/onboarding/ConfirmSeedPhrase';
import DoneWithSeedPhrase from './src/screens/onboarding/DoneWithSeedPhrase';

const { Screen, Navigator, Group } = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    RedHatDisplay_400Regular,
    RedHatDisplay_400Regular_Italic,
    RedHatDisplay_500Medium,
    RedHatDisplay_700Bold,
    RedHatDisplay_700Bold_Italic
  });
  return !fontsLoaded ? (
    <AppLoading />
  ) : (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator initialRouteName="onboardingDone">
          <Group screenOptions={{ headerShown: false }}>
            <Screen name="walletSetup" component={WalletSetup} />
            <Screen name="createWallet" component={CreateWallet} />
            <Screen name="secureWallet" component={SecureWallet} />
            <Screen name="seedScreenInfo" component={SeedScreenInfo} />
            <Screen name="revealSeedPhrase" component={RevealSeedPhrase} />
            <Screen name="confirmSeedPhrase" component={ConfirmSeedPhrase} />
            <Screen name="onboardingDone" component={DoneWithSeedPhrase} />
          </Group>
        </Navigator>
      </NavigationContainer>
    </Provider>
  );
}
