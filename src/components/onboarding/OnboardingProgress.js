import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import AppText from './../AppText';
import Icon from '../Icon';
import ProgressBar from '../ProgressBar';

export default function OnboardingProgress({ step, onClose }) {
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={onClose}>
        <Icon name={step > 1 ? 'chevron-back' : 'close'} size={20} />
      </TouchableOpacity>
      <ProgressBar step={step} />
      <AppText yellow small>
        {step} / 3
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20
  }
});
