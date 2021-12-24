import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import ProgressBar from "../../components/ProgressBar";
import Icon from "../../components/Icon";
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import AppTextInput from "../../components/forms/AppTextInput";
import AppPasswordInput from "../../components/forms/AppPasswordInput";
import OnboardingProgress from "../../components/OnboardingProgress";
import colors from "../../constants/colors";
import AppButton from "../../components/AppButton";

export default function CreateWallet() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const step = 1;

  return (
    <Screen>
      <OnboardingProgress step={1} />
      <View style={styles.formArea}>
        <AppText bold medium>
          Create Password
        </AppText>
        <AppText grey> This password will unlock your Air wallet only on this service.</AppText>

        <AppPasswordInput label="New password" icon="eye" placeholder="****************" />
        <AppPasswordInput label="Confirm Password" icon="eye" placeholder="****************" />

        <View style={styles.faceIdPromptContainer}>
          <AppText medium> Sign In with Face ID? </AppText>
          <Switch
            trackColor={{ false: colors.grey, true: colors.yellow }}
            thumbColor={isEnabled ? "white" : colors.grey}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
              </View> 
              
              <AppButton title = "Create Password "/>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  formArea: {
    marginTop: 40
  },
  faceIdPromptContainer: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
