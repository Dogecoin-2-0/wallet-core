import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../constants/colors";

import Icon from "../Icon";

export default function CheckBox({ checked, onPress }) {
  return (
    <TouchableOpacity style={[checked ? styles.checked : styles.unchecked]} onPress={onPress}>
      <Icon name={checked && "check"} size={13} color={checked ? colors.white : colors.black} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checked: {
    width: 20,
    height: 20,
    backgroundColor: colors.yellow,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    margin: 4
  },

  unchecked: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    margin: 4,
    borderColor: colors.yellow
  }
});
