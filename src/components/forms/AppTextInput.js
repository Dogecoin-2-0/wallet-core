/* eslint-disable react-native/no-color-literals */
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import AppText from '../AppText';
import Icon from '../Icon';

export default function AppTextInput({ label, icon, icons, iconAction, placeholder, ...otherProps }) {
  return (
    <View style={styles.container}>
      {label && <AppText grey> {label} </AppText>}
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder={placeholder} {...otherProps} />
        {icons && icons.map((icon, index) => <Icon key={index} name={icon} />)}
        {icon && <Icon name={icon} onPress={iconAction} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10
  },

  inputContainer: {
    backgroundColor: '#fff5ff',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 12.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 25
  },
  input: {
    fontSize: 16,
    width: '75%'
  }
});
