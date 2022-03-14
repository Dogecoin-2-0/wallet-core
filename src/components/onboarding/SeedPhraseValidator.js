/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { TouchableOpacity } from '..';
import AppText from '../AppText';
import colors from '../../constants/colors';
import ReusableAlert from '../../components/extras/ReusableAlert';

const width = Dimensions.get('screen').width;

export default function SeedPhraseValidator({ enableNavigate }) {
  const [unshuffled, setUnshuffled] = useState([]);
  const [shuffled, setShuffled] = useState([]);
  const [pickedKeys, setPickedKeys] = useState([]);
  const [targetIndex, setTargetIndex] = useState(0);
  const [correctEntries, setCorrectEntries] = useState([]);
  const { phrase } = useSelector(state => state.phraseReducer);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // const randomKey = () => {
  //   // random key from the array of phrases
  //   return Math.floor(Math.random() * shuffled.length);
  // };

  // const getUniqueKey = () => {
  //   // get a unique key
  //   let key = randomKey();
  //   while (checkIfKeyHasBeenPicked(key)) {
  //     key = randomKey();
  //   }
  //   return key;
  // };

  // const checkIfKeyHasBeenPicked = key => {
  //   return pickedKeys.includes(key);
  // };

  const addKeyToPickedList = key => {
    setPickedKeys([...pickedKeys, key]);
  };

  const addCorrectEntry = val => {
    setCorrectEntries([...correctEntries, shuffled[val]]);
  };

  useEffect(() => {
    if (!!phrase || phrase !== null) setUnshuffled(_.split(phrase, ' '));
  }, [phrase]);

  useEffect(() => {
    if (unshuffled.length > 0)
      setShuffled(
        _.map(unshuffled, value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
      );
  }, [unshuffled]);

  useEffect(() => {
    if (correctEntries.length === 12) enableNavigate(true);
  }, [correctEntries]);

  const onInvalidEntry = () => {
    setAlertMessage('Invalid Entry');
    setShowAlert(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {pickedKeys.length > 0 &&
          _.map(pickedKeys, key => (
            <TouchableOpacity style={{ width: width / 5 }} key={key}>
              <AppText>{unshuffled[key]}</AppText>
            </TouchableOpacity>
          ))}
      </View>
      <View style={styles.container2}>
        {shuffled.length > 0 &&
          _.map(shuffled, (word, index) => (
            <TouchableOpacity
              style={{ width: width / 5 }}
              key={index}
              onPress={() => {
                if (unshuffled[targetIndex] === word) {
                  addCorrectEntry(index);
                  addKeyToPickedList(targetIndex);
                  setShuffled(shuffled.filter((val, index) => index !== shuffled.findIndex(item => item === word)));
                  if (targetIndex < unshuffled.length - 1) {
                    setTargetIndex(targetIndex + 1);
                  }
                } else {
                  onInvalidEntry();
                }
              }}
            >
              <AppText> {word}</AppText>
            </TouchableOpacity>
          ))}
      </View>
      <ReusableAlert
        visible={showAlert}
        isSuccessful={false}
        message={alertMessage}
        close={() => {
          setShowAlert(false);
          setAlertMessage('');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 4,
    paddingHorizontal: 5,
    borderColor: colors.lightSmoke,
    borderStyle: 'solid',
    borderBottomWidth: 1
  },
  container2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center'
    // alignItems: 'center'
  }
});
