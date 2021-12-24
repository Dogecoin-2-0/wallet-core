/* eslint-disable react-native/no-color-literals */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
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

export default function App() {
  let [fontsLoaded] = useFonts({
    RedHatDisplay_400Regular,
    RedHatDisplay_400Regular_Italic,
    RedHatDisplay_500Medium,
    RedHatDisplay_700Bold,
    RedHatDisplay_700Bold_Italic
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        {/* <CreateWallet /> */}
        {/* <StatusBar */}
        <WalletSetup />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
