import { StyleSheet, Text, TouchableOpacityBase, View } from 'react-native';
import React, { useState, useCallback } from 'react';
import BottomSheet, { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';

import AppText from '../AppText';
import colors from '../../constants/colors';
import { TouchableOpacity } from 'react-native';
import { Icon } from '..';

export default function LanguageSwitch({ snapPoints, innerRef, handleClose }) {
  const [selected, setSelected] = useState('Google');
  const languages = require('../../utils/languages.json');

  const languagesList = Object.keys(languages);
  console.log(languages[languagesList[25]]['name']);

  //   console.log(searchEngines[Object.keys(searchEngines)[0]]['name']);
  const handleSelected = name => {
    setSelected(name);
    handleClose();
  };

  return (
    <BottomSheetModal ref={innerRef} snapPoints={snapPoints} style={styles.container} enablePanDownToClose index={0}>
      <AppText bold padded medium>
        Language
      </AppText>
      <BottomSheetFlatList
        data={languagesList}
        keyExtractor={item => item.name}
        renderItem={({ item, index }) => (
          <AppText padded grey>
            {' '}
            {languages[item]['name']}{' '}
          </AppText>
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
