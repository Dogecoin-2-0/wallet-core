/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  wrapperUnselected: {
    borderColor: colors.grey,
    borderWidth: 1,
    width: 16,
    height: 16,
    borderRadius: 50,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapperSelected: {
    borderColor: colors.yellow,
    borderWidth: 1,
    width: 16,
    height: 16,
    borderRadius: 50,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  indicator: {
    backgroundColor: colors.yellow,
    borderRadius: 50,
    height: 10,
    width: 10,
    padding: 2
  }
});

export default function RadioButton({ selected, onSelect }) {
  return (
    <>
      <Pressable style={[!selected && styles.wrapperUnselected, selected && styles.wrapperSelected]} onPress={onSelect}>
        <View style={[!selected && { backgroundColor: 'transparent' }, selected && styles.indicator]}></View>
      </Pressable>
    </>
  );
}
