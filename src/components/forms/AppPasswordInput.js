import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppText from '../AppText';
import AppTextInput from './AppTextInput';

export default function AppPasswordInput({ label, placeholder, noPassword, icon, ...otherProps }) {
  return (
    <View>
      <AppTextInput label={label} icon={'eye-outline'} placeholder="******" secureTextEntry />
      {!noPassword && <AppText grey> Password Strength: </AppText>}
    </View>
  );
}
