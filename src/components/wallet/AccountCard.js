import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import AppText from '../AppText';
import colors from '../../constants/colors';
import { useActiveAccount } from '../../hooks/accounts';

export default function AccountCard({ onPress, account }) {
  const acc = account ?? useActiveAccount();
  return (
    <TouchableOpacity style={[styles.container, styles.row]} onPress={onPress}>
      <View style={styles.row}>
        <Image source={require('../../../assets/avatar.png')} style={styles.avatar} />
        <AppText>{acc?.name}</AppText>
      </View>
      {/* <Icon name="chevron-down" /> */}
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
    marginVertical: 10,
    height: 64
  },
  avatar: {
    marginHorizontal: 10
  }
});
