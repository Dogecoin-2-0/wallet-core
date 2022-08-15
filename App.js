/* eslint-disable react-native/no-color-literals */
import './global';
import 'react-native-get-random-values'; // This should be imported first to provide `crypto.getRandomValues` to components that depend on it
import '@ethersproject/shims'; // Polyfill for ethers.js
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
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
import SendToken from './src/screens/app/SendToken';
import Tabs from './src/routes/Tabs';
import TransactionHistory from './src/screens/settings/TransactionHistory';
import InnerSettings from './src/screens/settings/InnerSettings';
import GeneralSettings from './src/screens/settings/GeneralSettings';
import ComingSoon from './src/screens/settings/ComingSoon';
import Login from './src/screens/app/Login';
import { AuthProvider, useAuth } from './src/contexts/auth';
import { fetchPrices } from './src/utils';

const { Screen, Navigator, Group } = createNativeStackNavigator();

function InstantiatingComponent() {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();

  useEffect(() => {
    (async () => {
      const pricesImmediate = await fetchPrices();
      dispatch(updatePrice(JSON.stringify(pricesImmediate)));

      setInterval(async () => {
        const pricesInterval = await fetchPrices();
        dispatch(updatePrice(JSON.stringify(pricesInterval)));
      }, 60 * 60 * 1000);
    })();
  }, []);

  return (
    <NavigationContainer>
      <Navigator>
        <Group screenOptions={{ headerShown: false }}>
          {!isAuth ? (
            <>
              <Screen name="walletSetup" component={gestureHandlerRootHOC(WalletSetup)} />
              <Screen name="createWallet" component={gestureHandlerRootHOC(CreateWallet)} />
              <Screen name="secureWallet" component={gestureHandlerRootHOC(SecureWallet)} />
              <Screen name="seedScreenInfo" component={gestureHandlerRootHOC(SeedScreenInfo)} />
              <Screen name="revealSeedPhrase" component={gestureHandlerRootHOC(RevealSeedPhrase)} />
              <Screen name="confirmSeedPhrase" component={gestureHandlerRootHOC(ConfirmSeedPhrase)} />
              <Screen name="onboardingDone" component={gestureHandlerRootHOC(DoneWithSeedPhrase)} />
            </>
          ) : (
            <>
              {/* Auth Routes */}
              <Screen name="login" component={gestureHandlerRootHOC(Login)} />

              <Screen name="home" component={gestureHandlerRootHOC(Tabs)} />
              <Screen name="tokenDetails" component={gestureHandlerRootHOC(TokenDetails)} />
              <Screen name="sendToken" component={gestureHandlerRootHOC(SendToken)} />

              {/* Settings */}
              <Screen name="transactionHistory" component={gestureHandlerRootHOC(TransactionHistory)} />
              <Screen name="innerSettings" component={gestureHandlerRootHOC(InnerSettings)} />
              <Screen name="generalSettings" component={gestureHandlerRootHOC(GeneralSettings)} />
              <Screen name="comingSoon" component={gestureHandlerRootHOC(ComingSoon)} />
            </>
          )}
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
    <AuthProvider>
      <Provider store={store}>
        <InstantiatingComponent />
      </Provider>
    </AuthProvider>
  );
}
