import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppText from '../AppText';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '../Icon';

const actions = [
  {
    name: 'Send',
    backgroundColor: '#E8FAE0',
    icon: require(`../../../assets/actions/send.png`)
  },
  {
    name: 'Receive',
    icon: require(`../../../assets/actions/receive.png`),
    backgroundColor: '#DCE8FC'
  },
  {
    name: 'Buy',
    icon: require(`../../../assets/actions/buy.png`),
    backgroundColor: '#FEF0D7'
  }
];
export default function Actions() {
  return (
    <View style={styles.container}>
      {actions.map((action, index) => (
        <TouchableOpacity key={index} style={[styles.actionContainer]}>
          <View style={[styles.actionContainer, { backgroundColor: action.backgroundColor }]}>
            <Image source={action.icon} style={styles.action} />
          </View>
          <AppText bold style={{ overflow: 'hidden' }} centered>
            {action.name}
          </AppText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20
  },
  actionContainer: {
    borderRadius: 100,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignContent: 'center'
  },
  action: {
    alignSelf: 'center'
  }
});
