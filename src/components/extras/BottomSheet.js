import React from "react";
import { Dimensions, View, StyleSheet, Text, Button } from "react-native";
import { Portal } from "@gorhom/portal";
import { Modalize } from "react-native-modalize";
import AppButton from "../AppButton";
import colors from "../../constants/colors";
import AppText from "../AppText";

const { height } = Dimensions.get("screen");
const modalHeight = height * 0.35;

const BottomSheet = ({ modalRef, onClose, title, body }) => {
  return (
    <Portal>
      <Modalize ref={modalRef} modalHeight={modalHeight}>
        <View style={styles.content}>
          <AppText bold medium>
            {title}
          </AppText>

          <AppText>{body}</AppText>
          <AppButton title="Got it" onPress={onClose} />
        </View>
      </Modalize>
    </Portal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "space-between",
    height: modalHeight,
    paddingHorizontal: 20,
    paddingVertical: 32,
    backgroundColor: colors.white
  }
});
