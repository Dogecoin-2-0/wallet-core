import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from '..';
import AppText from '../AppText';

const width = Dimensions.get('screen').width;

// how many tries user has to enter the correct phrase

// 3 tries

let unshuffled = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];

let shuffled = unshuffled
  .map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);

function randomKey() {
  // random key from the array of phrases
  return Math.floor(Math.random() * shuffled.length);
}

let pickedKeys = [];

function addKeyToPickedList(key) {
  // add phrase to the list of picked phrases
  pickedKeys.push(key);
}

function getUniqueKey() {
  // get a unique key
  let key = randomKey();
  while (checkIfKeyHasBeenPicked(key)) {
    key = randomKey();
  }
  return key;
}

function checkIfKeyHasBeenPicked(key) {
  // check if the key has been picked
  return pickedKeys.includes(key);
}

export default function SeedPhraseValidator() {
  const [prompt, setPrompt] = useState(randomKey());
  const [maxTries, setMaxTries] = useState(3);

  const correctEntries = [];
  function addCorrectEntry(val) {
    correctEntries.push(shuffled[val]);
    console.log(correctEntries);
  }
  const onInvalidEntry = () => {
    setMaxTries(maxTries => maxTries - 1);
    if (!maxTries >= 0) {
      Alert.alert('Invalid Entry', `You have ${maxTries} chances left`);
    } else {
      Alert.alert('Account Locked', 'you have reached the maximum tries available');
    }
  };

  return (
    <View>
      <AppText> {randomKey()} </AppText>
      <View style={styles.container}>
        {shuffled.map((word, index) => (
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
    // alignItems: 'center'
  }
});
