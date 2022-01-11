import React from "react";
import { Dimensions, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../constants/colors";
import { BlurView } from "expo-blur";
import AppText from "../AppText";

const width = Dimensions.get("screen").width / 4;

export default function SeedPhraseWraper() {
  const words = [
    "boy",
    "father",
    "sister",
    "yyy",
    "you",
    "tyial",
    "polity",
    "sibling",
    "huo",
    "Alien",
    "developer",
    "Cross"
  ];
  const text = "Your seed phrase is:";
  return (
    <TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.container}>
          {words &&
            words.map((word, index) => (
              <AppText style={{ width: width, margin: 10 }} key={index}>
                {index + 1}. {word}
              </AppText>
            ))}
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center"
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 30
  }
});
