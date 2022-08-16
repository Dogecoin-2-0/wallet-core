import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppButton from '../AppButton';
import AppTextInput from '../forms/AppTextInput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18
  }
});

export default function AccountCreator({ onProceedClick, onChangeText }) {
  return (
    <>
      <View style={styles.container}>
        <AppTextInput
          onChangeText={onChangeText}
          placeholder="Enter Account Name"
          icon="face-man-profile"
          label="Enter Account Name"
        />
        <AppButton onPress={onProceedClick} title="Continue" />
      </View>
    </>
  );
}
