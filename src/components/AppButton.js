import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '.';
import colors from '../constants/colors';
import AppText from './AppText';

export default function AppButton({ title, outlined, onPress, half, icon }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, outlined && styles.outlined, half && styles.half]}>
      {icon && <Icon name={icon} color={outlined ? colors.yellow : colors.white} size={15} />}
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    alignSelf: 'center',
    marginVertical: 10,
    padding: 10
  },

  outlined: {
    backgroundColor: 'transparent',
    borderColor: colors.yellow,
    borderWidth: 1
  },
  half: {
    width: '46%',
    justifyContent: 'space-evenly'
  }
});
