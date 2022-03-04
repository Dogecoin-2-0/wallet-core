import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import AppText from '../AppText';
import { Icon } from '..';
import colors from '../../constants/colors';
import { useActiveAccount } from '../../hooks/accounts';

export default function AccountCard({ onPress }) {
  const activeAccount = useActiveAccount();
  return (
    <TouchableOpacity style={[styles.container, styles.row]} onPress={onPress}>
      <View style={styles.row}>
        <Image source={require('../../../assets/avatar.png')} style={styles.avatar} />
        <AppText>{activeAccount?.name}</AppText>
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
