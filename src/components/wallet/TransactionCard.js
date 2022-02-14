import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import AppText from '../AppText';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../constants/colors';

export default function TransactionCard() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <AppText grey> Mar 4 at 10:04 AM</AppText>
        <View style={styles.row}>
          <View style={styles.row}>
            <Image source={require('../../../assets/actions/clock-loading.png')} style={styles.icon} />
            <View>
              <AppText medium>Recieved BNB</AppText>
              <AppText yellow bold>
                Pending
              </AppText>
            </View>
          </View>
          <View>
            <AppText medium>2.078 BNB</AppText>
            <AppText grey>$647.22</AppText>
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
