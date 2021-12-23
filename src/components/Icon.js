import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import colors from "../constants/colors";

export default function Icon({ name, size, color }) {
  return (
    <View>
      <MaterialCommunityIcons name={name} size={size ? size : 25} color={color ? color : colors.black} />
    </View>
  );
}
