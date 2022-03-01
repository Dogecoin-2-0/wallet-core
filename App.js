/* eslint-disable react-native/no-color-literals */
import './global';
import 'react-native-get-random-values'; // This should be imported first to provide `crypto.getRandomValues` to components that depend on it
import '@ethersproject/shims'; // Polyfill for ethers.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updatePrice } from './src/redux/priceSlice';
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
import TokenDetails from './src/screens/app/TokenDetails';
import { instantiateSocket } from './src/socket';
import SendToken from './src/screens/app/SendToken';
import Tabs from './src/routes/Tabs';
import TransactionHistory from './src/screens/settings/TransactionHistory';
import InnerSettings from './src/screens/settings/InnerSettings';
import GeneralSettings from './src/screens/settings/GeneralSettings';
import ComingSoon from './src/screens/settings/ComingSoon';

const { Screen, Navigator, Group } = createNativeStackNavigator();

function InstantiatingComponent() {
  const dispatch = useDispatch();
  const socket = instantiateSocket();
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected: ', socket.id);
    });
    socket.on('price', data => {
      dispatch(updatePrice(data));
    });
  }, []);

  return (
    <NavigationContainer>
      <Navigator initialRouteName="walletSetup">
        <Group screenOptions={{ headerShown: false }}>
          <Screen name="walletSetup" component={WalletSetup} />
          <Screen name="createWallet" component={CreateWallet} />
          <Screen name="secureWallet" component={SecureWallet} />
          <Screen name="seedScreenInfo" component={SeedScreenInfo} />
          <Screen name="revealSeedPhrase" component={RevealSeedPhrase} />
          <Screen name="confirmSeedPhrase" component={ConfirmSeedPhrase} />
          <Screen name="onboardingDone" component={DoneWithSeedPhrase} />

          {/* Auth Routes */}
          <Screen name="home" component={Tabs} />
          <Screen name="tokenDetails" component={TokenDetails} />
          <Screen name="sendToken" component={SendToken} />

          {/* Settings */}
          <Screen name="transactionHistory" component={TransactionHistory} />
          <Screen name="innerSettings" component={InnerSettings} />
          <Screen name="generalSettings" component={GeneralSettings} />
          <Screen name="comingSoon" component={ComingSoon} />
        </Group>
      </Navigator>
    </NavigationContainer>
  );
}

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
      <InstantiatingComponent />
    </Provider>
  );
}
