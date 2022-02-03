import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import Icon from '../../components/Icon';

export default function Home() {
  return (
    <Screen>
      <View style={styles.row}>
        <View style={styles.username}>
          <TouchableOpacity style={styles.rowArea}>
            <Image source={require('../../../assets/avatar.png')} style={styles.avatar} />
            <AppText bold yellow>
              Queen Bee
            </AppText>
            <Icon name="chevron-down" />
          </TouchableOpacity>
        </View>
        <Image source={require('../../../assets/dogeroundedLogo.png')} style={styles.logo} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  username: {
    justifyContent: 'flex-end'
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 5
  },
  logo: {
    width: 140,
    height: 140
  },
  rowArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
