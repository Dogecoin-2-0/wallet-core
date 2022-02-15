import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import AppText from '../AppText';
import { Icon } from '..';
import colors from '../../constants/colors';

export default function AccountCard({ onPress }) {
  return (
    <TouchableOpacity style={[styles.container, styles.row]} onPress={onPress}>
      <View style={styles.row}>
        <Image source={require('../../../assets/avatar.png')} style={styles.avatar} />
        <AppText> Queen Bee</AppText>
      </View>
      <Icon name="chevron-down" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  container: {
    padding: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginVertical: 10
  },
  avatar: {
    marginHorizontal: 10
  }
});
