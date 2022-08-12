/* eslint-disable react-native/no-inline-styles */
import { StyleSheet } from 'react-native';
import React from 'react';
import AppText from '../AppText';
import { TouchableOpacity, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Icon } from '..';
import colors from '../../constants/colors';

export default function Actions({ onSendIconPress, onRecieveIconPress, onChartIconPress }) {
  return (
    <GestureHandlerRootView style={styles.container}>
      {/* {actions.map((action, index) => ( */}
      <TouchableOpacity style={[styles.actionContainer]} onPress={onSendIconPress}>
        {/* <View style={[styles.actionContainer, { backgroundColor: action.backgroundColor }]}> */}
        <Icon name="arrow-right-circle-outline" color={colors.green} style={styles.action} />
        {/* </View> */}
        <AppText bold style={{ overflow: 'hidden' }} centered>
          Send
        </AppText>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.actionContainer]} onPress={onRecieveIconPress}>
        {/* <View style={[styles.actionContainer, { backgroundColor: action.backgroundColor }]}> */}
        <Icon name="wallet-plus-outline" color={colors.blue} style={styles.action} />
        {/* </View> */}
        <AppText bold style={{ overflow: 'hidden' }} centered>
          Receive
        </AppText>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.actionContainer]} onPress={onChartIconPress}>
        {/* <View style={[styles.actionContainer, { backgroundColor: action.backgroundColor }]}> */}
        <Icon name="chart-bar" color={colors.yellow} style={styles.action} />
        {/* </View> */}
        <AppText bold style={{ overflow: 'hidden' }} centered>
          Charts
        </AppText>
      </TouchableOpacity>

      {/* ))} */}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20
  },
  // actionContainer: {
  //   borderRadius: 100,
  //   height: 60,
  //   width: 60,
  //   justifyContent: 'center',
  //   alignContent: 'center'
  // },
  action: {
    alignSelf: 'center'
  }
});
