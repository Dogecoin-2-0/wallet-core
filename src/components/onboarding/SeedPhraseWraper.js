/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { utils } from 'ethers';
import _ from 'lodash';
import AppText from '../AppText';

const width = Dimensions.get('screen').width / 4;

export default function SeedPhraseWraper() {
  const [phrase, setPhrase] = useState('');

  useEffect(() => {
    const randBytes = utils.randomBytes(16);
    const mnemonic = utils.entropyToMnemonic(randBytes);
    setPhrase(mnemonic);
  });
  // const text = "Your seed phrase is:";
  return (
    <TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.container}>
          {phrase &&
            _.map(phrase.split(' '), (word, index) => (
              <AppText style={{ width, margin: 10 }} key={index}>
                {index + 1}. {word}
              </AppText>
            ))}
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // blurContainer: {
  //   flex: 1,
  //   padding: 20,
  //   justifyContent: "center"
  // },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 30
  }
});
