import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import AppText from '../AppText';
import { useAccountById } from '../../hooks/accounts';

export default function RecentTransactionCard({ id }) {
  const { account, accountById } = useAccountById();

  useEffect(() => {
    accountById(id);
  }, []);

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.image}>
        <Image source={require('../../../assets/avatar.png')} />
      </View>
      <View>
        <AppText>{account?.name}</AppText>
        <AppText grey>
          {account?.address?.slice(0, 6) +
            '...' +
            account?.address?.slice(account?.address?.length - 4, account?.address?.length)}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center'
  },

  image: {
    marginRight: 10
  }
});
