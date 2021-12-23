import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../../constants/colors";
import AppText from "../AppText";
import Icon from "../Icon";

export default function AppTextInput({ label, icon, iconAction, placeholder, ...otherProps }) {
  return (
    <View style={styles.container}>
      <AppText grey> {label} </AppText>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder={placeholder} {...otherProps} />
        {icon && <Icon name={icon} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5
  },

  inputContainer: {
    backgroundColor: "#fff5ff",
    paddingHorizontal: 5,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 25
  },
  input: {
    fontSize: 16,
    width: "90%"
  }
});
