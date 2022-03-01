import { StyleSheet, Text, TouchableOpacityBase, View } from 'react-native';
import React, { useState, useCallback } from 'react';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import AppText from '../AppText';
import colors from '../../constants/colors';
import { TouchableOpacity } from 'react-native';
import { Icon } from '..';

export default function SearchEngineSwitch({ snapPoints, ref, handleClose }) {
  const [selected, setSelected] = useState('Google');
  const searchEngines = [
    {
      name: 'Google'
    },
    {
      name: 'Duck Duck Go'
    }
  ];

  return (
    <BottomSheet ref={ref} snapPoints={snapPoints} style={styles.container}>
      <AppText bold padded medium>
        Search Engine
      </AppText>
      <BottomSheetFlatList
        data={searchEngines}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              setSelected(item.name);
              handleClose;
            }}
          >
            <AppText padded grey>
              {item.name}
            </AppText>

            {selected == item.name ? <Icon name="check" color={colors.green} /> : null}
          </TouchableOpacity>
        )}
      />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30
    // backgroundColor: colors.white
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
