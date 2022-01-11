import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppText from './../AppText';
import Icon from '../Icon';
import ProgressBar from '../ProgressBar';

export default function OnboardingProgress({ step }) {
  return (
    <View style={styles.row}>
      <Icon name="close" size={20} />
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
