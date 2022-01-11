/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initPhrase } from '../../redux/phraseSlice';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import _ from 'lodash';
import AppText from '../AppText';
import propTypes from 'prop-types';

const width = Dimensions.get('screen').width / 4;

function SeedPhraseWraper({ isInit }) {
  const { phrase } = useSelector(state => state.phraseReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isInit) {
      dispatch(initPhrase());
    }
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

SeedPhraseWraper.propTypes = {
  isInit: propTypes.bool
};

SeedPhraseWraper.defaultPropTypes = {
  isInit: false
};

export default SeedPhraseWraper;
