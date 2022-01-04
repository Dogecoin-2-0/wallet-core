import React, { useState } from "react";
import { Image, StyleSheet, Switch, Text, View } from "react-native";
import ProgressBar from "../../components/ProgressBar";
import Icon from "../../components/Icon";
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import AppTextInput from "../../components/forms/AppTextInput";
import AppPasswordInput from "../../components/forms/AppPasswordInput";
import OnboardingProgress from "../../components/OnboardingProgress";
import colors from "../../constants/colors";
import AppButton from "../../components/AppButton";
import CheckBox from "../../components/forms/CheckBox";
import { verifyMessage } from "ethers/lib/utils";

export default function SecureWallet() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const step = 1;

  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckBox = () => setIsChecked(!isChecked);
  return (
    <Screen>
      <OnboardingProgress step={2} />
      <View style={styles.formArea}>
        <AppText bold medium>
          Secure your wallet
        </AppText>

        <Image source={require("../../../assets/doge2locked.png")} style={styles.lockedImage} />
        <View>
          <AppText grey>
            Don't risk losing your funds. protect your wallet by saving your seed phrase in a place you trust. It's the
            only way to recover your wallet if you get locked out of the app or get a new device.{" "}
          </AppText>
        </View>

        <View style={styles.faceIdPromptContainer}></View>

        <AppText underlined yellow bold centered style={{ marginVertical: 50 }}>
          Remind me Later
        </AppText>
        <View style={{ marginTop: 10 }}>
          <AppButton title="Start" />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  formArea: {
    marginTop: 40
  },
  lockedImage: {
    width: 217,
    height: 217,
    alignSelf: "center",
    marginVertical: 50
  },

  faceIdPromptContainer: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
