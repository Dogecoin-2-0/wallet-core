import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import React from 'react';
import AppText from '../AppText';
const width = Dimensions.get('screen').width;

export default function TemporaryValidator() {
  const words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];

  const pickedWords = [];

  return (
    <View>
      <View style={styles.container}>
        {words.map((word, index) => (
          <TouchableOpacity
            style={{ width: width / 5 }}
            key={index}
            onPress={() => {
              if (index == prompt) {
                addCorrectEntry(index);
              } else {
                onInvalidEntry();
              }
            }}
          >
            <AppText> {word}</AppText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 25,
    paddingHorizontal: 25
  }
});
