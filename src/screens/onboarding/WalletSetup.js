import React from "react";
import { ImageBackground, StyleSheet, View, SafeAreaView, Image, StatusBar } from "react-native";

import AppButton from "../../components/AppButton";

import AppText from "../../components/AppText";
import colors from "../../constants/colors";

export default function WalletSetup() {
  return (
    <View style={{ flex: 0 }}>
      <StatusBar style="auto" />
      <ImageBackground source={require("../../../assets/wallet-setupbg.jpg")} style={styles.background}>
        <SafeAreaView style={styles.container}>
          <Image source={require("../../../assets/walletSetupLogo.png")} style={styles.logoArea} />
          <AppText white extraBig>
            Wallet Setup
          </AppText>
          <AppText white>Import an existing wallet or create a new one</AppText>

          <View style={{ marginTop: 50 }}>
            <AppButton title="Import Using Seed Phrase" outlined />
            <AppButton title="Create Password" />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20
  },
  logoArea: {
    margin: 50
  }
});
