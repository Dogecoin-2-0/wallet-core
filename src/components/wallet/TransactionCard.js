import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import AppText from '../AppText';
import { TouchableOpacity, GestureHandlerRootView } from 'react-native-gesture-handler';
import colors from '../../constants/colors';

export default function TransactionCard({ price, amount, date, type, status, onPress, symbol = 'BNB' }) {
  return (
    <GestureHandlerRootView style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <AppText grey> {date}</AppText>
        <View style={styles.row}>
          <View style={styles.row}>
            <View>
              <Image
                source={
                  type === 'SENT'
                    ? require('../../../assets/transactions/confirmed.png')
                    : require('../../../assets/transactions/arrow-circle.png')
                }
                style={styles.icon}
              />
            </View>
            <View>
              <AppText medium>{type === 'SENT' ? `SENT ${symbol}` : `Received ${symbol}`}</AppText>
              <AppText yellow={status === 'Pending'} green={status === 'Confirmed'} red={status === 'Failed'} bold>
                {status}
              </AppText>
            </View>
          </View>
          <View>
            <AppText small>{amount}</AppText>
            <AppText grey small>
              ${price.toFixed(3)}
            </AppText>
          </View>
        </View>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  icon: {
    marginRight: 10,
    width: 20,
    height: 20,
    justifyContent: 'center'
  }
});
