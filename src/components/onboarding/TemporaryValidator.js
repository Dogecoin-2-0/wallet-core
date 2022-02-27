import { StyleSheet, TouchableOpacity, View, Dimensions, Alert } from 'react-native';
import React, { useState } from 'react';
import AppText from '../AppText';
const width = Dimensions.get('screen').width;

export default function TemporaryValidator() {
  const words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];

  const [pickedWords, updatePickedWords] = useState(['']);

  const addCorrectEntry = entry => {
    updatePickedWords(pickedWords => [...pickedWords, words[entry]]);
  };

  const onInvalidEntry = () => {
    Alert.alert('Wrong Entry', 'Please try again');
  };

  return (
    <View>
      <View style={styles.container}>
        {pickedWords.length > 1 &&
          pickedWords.map((word, index) => (
            <TouchableOpacity style={{ width: width / 4 }} key={index}>
              <AppText> {word}</AppText>
            </TouchableOpacity>
          ))}
      </View>
      <View style={styles.container}>
        {words.map((word, index) => (
          <TouchableOpacity
            style={{ width: width / 4 }}
            key={index}
            onPress={() => {
              if (1 == 1) {
                addCorrectEntry(index);
                console.log(pickedWords);
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
