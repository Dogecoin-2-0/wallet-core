import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from '..';
import AppText from '../AppText';

const width = Dimensions.get('screen').width;

// how many tries user has to enter the correct phrase

const MAX_TRIES = 3; // 3 tries

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
  return (
    <View>
      <AppText> {randomKey()} </AppText>
      <View style={styles.container}>
        {shuffled.map((word, index) => (
          <TouchableOpacity
            style={{ width: width / 5 }}
            key={index}
            onPress={() => {
              console.log(index, randomKey());
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
