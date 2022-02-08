import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppText from '../AppText';
import AppButton from '../AppButton';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default function AccountSwitcher() {
  const accounts = [
    {
      id: 1,
      username: 'Queen Bee',
      avatarUrl: require('../../../assets/avatar.png')
    },
    {
      id: 2,
      username: 'Lamino Rubix',
      avatarUrl: require('../../../assets/avatar.png')
    },
    {
      id: 3,
      username: 'Nei Momo',
      avatarUrl: require('../../../assets/avatar.png')
    }
    // {
    //   id: 4,
    //   username: 'Nei Mana',
    //   avatarUrl: require('../../../assets/avatar.png')
    // }
  ];
  return (
    <View>
      <ScrollView>
        {accounts.map(account => {
          return (
            <TouchableOpacity key={account.username}>
              <View style={styles.row}>
                <Image source={account.avatarUrl} style={styles.avatar} />
                <AppText> {account.username}</AppText>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <AppButton title="Create New Account" outlined />
      <AppButton title="Import Account" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 10
  }
});
