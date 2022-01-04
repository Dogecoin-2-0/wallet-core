/* eslint-disable react-native/no-color-literals */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "./global";
import CreateWallet from "./src/screens/onboarding/CreateWallet";

import AppLoading from "expo-app-loading";
import {
  useFonts,
  RedHatDisplay_400Regular,
  RedHatDisplay_400Regular_Italic,
  RedHatDisplay_500Medium,
  RedHatDisplay_700Bold,
  RedHatDisplay_700Bold_Italic
} from "@expo-google-fonts/red-hat-display";
import WalletSetup from "./src/screens/onboarding/WalletSetup";
import SecureWallet from "./src/screens/onboarding/SecureWallet";
import SeedScreenInfo from "./src/screens/onboarding/SeedScreenInfo";

const { Screen, Navigator, Group } = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    RedHatDisplay_400Regular,
    RedHatDisplay_400Regular_Italic,
    RedHatDisplay_500Medium,
    RedHatDisplay_700Bold,
    RedHatDisplay_700Bold_Italic
  });
  return !fontsLoaded ? (
    <AppLoading />
  ) : (
    <NavigationContainer>
      <Navigator initialRouteName="walletSetup">
        <Group screenOptions={{ headerShown: false }}>
          <Screen name="walletSetup" component={WalletSetup} />
          <Screen name="createWallet" component={CreateWallet} />
          <Screen name="secureWallet" component={SecureWallet} />
          <Screen name="seedScreenInfo" component={SeedScreenInfo} />
        </Group>
      </Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {}
});
