import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Icon } from '..';
import AppText from '../AppText';

export default function SettingItem({ icon, label }) {
  return (
    <View style={styles.container}>
      <Icon name={icon} style={styles.icon} />
      <AppText>{label}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 20
  },
  icon: {
    marginRight: 10
  }
});
