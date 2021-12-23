import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppText from "../AppText";
import AppTextInput from "./AppTextInput";

export default function AppPasswordInput({ label, placeholder, icon, ...otherProps }) {
  return (
    <View>
      <AppTextInput label={label} icon={"eye"} placeholder="******" secureTextEntry />
      <AppText> Password Strength: Good</AppText>
    </View>
  );
}

const styles = StyleSheet.create({});
