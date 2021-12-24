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
    marginVertical: 10
  },

  inputContainer: {
    backgroundColor: "#fff5ff",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 12.5,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 25
  },
  input: {
    fontSize: 16,
    width: "90%"
  }
});
