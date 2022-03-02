import { StyleSheet, Text, TouchableOpacityBase, View } from 'react-native';
import React, { useState, useCallback } from 'react';
import BottomSheet, { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';

import AppText from '../AppText';
import colors from '../../constants/colors';
import { TouchableOpacity } from 'react-native';
import { Icon } from '..';

export default function LanguageSwitch({ snapPoints, innerRef, handleClose }) {
  const [selected, setSelected] = useState('English');
  const languages = require('../../utils/languages.json');

  const languagesList = Object.keys(languages);

  //   console.log(searchEngines[Object.keys(searchEngines)[0]]['name']);
  const handleSelected = val => {
    // setSelected(val);
    handleClose();
  };

  return (
    <BottomSheetModal ref={innerRef} snapPoints={snapPoints} style={styles.container} enablePanDownToClose index={0}>
      <AppText bold padded medium>
        Language
      </AppText>
      <BottomSheetFlatList
        // initialScrollIndex={31} // change to current user language
        scrollsToTop={true}
        data={languagesList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.item}>
            <AppText padded grey={selected != languages[item]['name']}>
              {languages[item]['name']}
            </AppText>

            {selected == languages[item]['name'] ? <Icon name="check" color={colors.green} /> : null}
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
