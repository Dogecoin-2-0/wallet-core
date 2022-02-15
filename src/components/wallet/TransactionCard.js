import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import AppText from '../AppText';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../constants/colors';
import { iteratee } from 'lodash';

export default function TransactionCard({ price, amount, date, type, status, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <AppText grey> {date}</AppText>
        <View style={styles.row}>
          <View style={styles.row}>
            <Image source={require('../../../assets/actions/clock-loading.png')} style={styles.icon} />
            <View>
              <AppText medium>{type}</AppText>
              <AppText yellow={status === 'Pending'} green={status === 'Confirmed'} red={status === 'Failed'} bold>
                {status}
              </AppText>
            </View>
          </View>
          <View>
            <AppText medium>{amount}</AppText>
            <AppText grey>{price}</AppText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
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
    width: 25,
    height: 25,
    justifyContent: 'center'
  }
});
