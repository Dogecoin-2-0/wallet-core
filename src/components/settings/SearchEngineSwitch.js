import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ReusableBottomSheet, { BottomSheetFlatList } from '../extras/ReusableBottomSheet';
import AppText from '../AppText';

export default function SearchEngineSwitch() {
  const searchEngines = [
    {
      name: 'Google'
    },
    {
      name: 'Duck Duck Go'
    }
  ];
  return (
    <BottomSheetFlatList
      data={searchEngines}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <AppText> {item.name}</AppText>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({});
