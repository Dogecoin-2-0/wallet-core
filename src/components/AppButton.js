import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import AppText from './AppText';

export default function AppButton({ title, outlined, onPress, half }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, outlined && styles.outlined, half && styles.half]}>
      {!outlined ? (
        <AppText bold underlined white>
          {title}
        </AppText>
      ) : (
        <AppText bold underlined yellow>
          {title}
        </AppText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.yellow,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    alignSelf: 'center',
    marginVertical: 10
  },

  outlined: {
    backgroundColor: 'transparent',
    borderColor: colors.yellow,
    borderWidth: 1
  },
  half: {
    width: '48%'
  }
});
