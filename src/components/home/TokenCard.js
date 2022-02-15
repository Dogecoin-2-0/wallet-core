import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AppText from '../AppText';
import colors from '../../constants/colors';
import Icon from '../Icon';

export default function TokenCard({ onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.avatar} />
      <View>
        <View style={styles.row}>
          <AppText medium> Ethereum </AppText>
          <AppText medium> 2.5123 ETH </AppText>
        </View>
        <View style={styles.row}>
          <AppText grey> $1,722 </AppText>
          <View style={styles.row}>
            <Icon name="arrow-top-right" color={colors.green} size={20} />
            <AppText green> 4.06% </AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    marginVertical: 5,
    flexDirection: 'row'
    // justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: colors.lightSmoke, // 'rgba(255, 255, 255, 0.1)',
    marginRight: 20
  }
});
