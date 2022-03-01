import { StyleSheet, Text, TouchableOpacityBase, View } from 'react-native';
import React, { useState, useCallback } from 'react';
import BottomSheet, { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';

import AppText from '../AppText';
import colors from '../../constants/colors';
import { TouchableOpacity } from 'react-native';
import { Icon } from '..';

export default function SearchEngineSwitch({ snapPoints, innerRef, handleClose }) {
  const [selected, setSelected] = useState('Google');
  const searchEngines = [
    {
      name: 'Google'
    },
    {
      name: 'Duck Duck Go'
    }
  ];

  const handleSelected = name => {
    setSelected(name);
    handleClose();
  };

  return (
    <BottomSheetModal ref={innerRef} snapPoints={snapPoints} style={styles.container} enablePanDownToClose index={0}>
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
              handleSelected(item.name);
            }}
          >
            <AppText padded grey>
              {item.name}
            </AppText>

            {selected == item.name ? <Icon name="check" color={colors.green} /> : null}
          </TouchableOpacity>
        )}
      />
    </BottomSheetModal>
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
