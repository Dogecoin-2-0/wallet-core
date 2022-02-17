import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AppText from '../AppText';

export default function RecentTransactionCard() {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.image}>
        <Image source={require('../../../assets/avatar.png')} />
      </View>
      <View>
        <AppText>Jennie</AppText>
        <AppText grey>0x3Dc6...DxE9</AppText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center'
  },

  image: {
    marginRight: 10
  }
});
