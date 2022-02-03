import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const actions = [
  {
    name: 'Create',
    icon: 'plus-circle-outline'
  },
  {
    name: 'Import',
    icon: 'cloud-upload-outline'
  }
];
export default function Actions() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {}
});
