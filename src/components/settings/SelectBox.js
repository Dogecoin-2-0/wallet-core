import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import AppText from '../AppText';
import { Icon } from '..';
// import { TouchableOpacity } from '..';

export default function SelectBox({ title, selectedValue, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <AppText small grey>
          {title}
        </AppText>
        <AppText bold>{selectedValue}</AppText>
      </View>
      <View>
        <Icon name="chevron-down" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10
  }
});
