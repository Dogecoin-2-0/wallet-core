/* eslint-disable react-native/no-inline-styles */
import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import AppText from '../AppText';
import { TouchableOpacity } from 'react-native-gesture-handler';

const actions = [
  {
    name: 'Send',
    backgroundColor: '#E8FAE0',
    icon: require('../../../assets/actions/send.png')
  },
  {
    name: 'Receive',
    icon: require('../../../assets/actions/receive.png'),
    backgroundColor: '#DCE8FC'
  },
  {
    name: 'Buy',
    icon: require('../../../assets/actions/buy.png'),
    backgroundColor: '#FEF0D7'
  }
];
export default function Actions({ showBuy = true, onSendIconPress, onRecieveIconPress, onBuyIconPress }) {
  return (
    <View style={styles.container}>
      {/* {actions.map((action, index) => ( */}
      <TouchableOpacity style={[styles.actionContainer]} onPress={onSendIconPress}>
        {/* <View style={[styles.actionContainer, { backgroundColor: action.backgroundColor }]}> */}
        <Image source={actions[0].icon} style={styles.action} />
        {/* </View> */}
        <AppText bold style={{ overflow: 'hidden' }} centered>
          {actions[0].name}
        </AppText>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.actionContainer]} onPress={onRecieveIconPress}>
        {/* <View style={[styles.actionContainer, { backgroundColor: action.backgroundColor }]}> */}
        <Image source={actions[1].icon} style={styles.action} />
        {/* </View> */}
        <AppText bold style={{ overflow: 'hidden' }} centered>
          {actions[1].name}
        </AppText>
      </TouchableOpacity>
      {showBuy && (
        <TouchableOpacity style={[styles.actionContainer]} onPress={onBuyIconPress}>
          {/* <View style={[styles.actionContainer, { backgroundColor: action.backgroundColor }]}> */}
          <Image source={actions[2].icon} style={styles.action} />
          {/* </View> */}
          <AppText bold style={{ overflow: 'hidden' }} centered>
            {actions[2].name}
          </AppText>
        </TouchableOpacity>
      )}
      {/* ))} */}
    </View>
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
