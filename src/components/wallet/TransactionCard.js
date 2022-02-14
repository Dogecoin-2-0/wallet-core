import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppText from '../AppText';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../constants/colors';

export default function TransactionCard() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <AppText grey> Mar 4 at 10:04 AM</AppText>
        <AppText medium> Recieved BNB</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10
  }
});
