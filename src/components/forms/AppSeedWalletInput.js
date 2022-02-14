import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import AppTextInput from './AppTextInput';
import colors from '../../constants/colors';

export default function AppSeedWalletIn({ touched }) {
  return (
    <View>
      {touched ? (
        <View style={styles.border}>
          <AppTextInput icons={['eye-outline', 'qrcode-scan']} placeholder="Seed Phrase" />
        </View>
      ) : (
        <AppTextInput icons={['eye-outline', 'scan-helper']} placeholder="Seed Phrase" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  border: {
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 16
  }
});
