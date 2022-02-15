import { Image, StyleSheet, View, TouchableOpacity, FlatList, Pressable } from 'react-native';
import React, { useRef, useState } from 'react';
import AppButton from '../AppButton';
import AppText from '../AppText';
import { Icon } from '..';
import colors from '../../constants/colors';

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
  ];
  const [selectedAccount, setSelectedAccount] = useState(accounts[0].id);
  return (
    <View>
      {/* <ScrollView> */}
      {accounts.map(account => {
        return (
          <Pressable
            key={account.username}
            style={[styles.row, styles.container]}
            onPress={() => {
              setSelectedAccount(account.id);
            }}
          >
            <View style={styles.row}>
              <Image source={account.avatarUrl} style={styles.avatar} />
              <AppText> {account.username}</AppText>
            </View>
            {selectedAccount == account.id && <Icon name="check" color={colors.green} />}
          </Pressable>
        );
      })}
      {/* </ScrollView> */}

      <AppButton title="Create New Account" outlined />
      <AppButton title="Import Account" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 10
  },
  container: {
    padding: 5
  }
});
