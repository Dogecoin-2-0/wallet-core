import { Image, StyleSheet, View, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppText from '../AppText';
import AppButton from '../AppButton';
import { Icon } from '..';
import colors from '../../constants/colors';
import { useAccounts, useActiveAccount } from '../../hooks/accounts';
import { _setActiveId } from '../../storage';
import { useAuth } from '../../contexts/auth';

export default function AccountSwitcher({ showButtons = true, navigation }) {
  const accounts = useAccounts();
  const activeAccount = useActiveAccount();
  const [selectedAccount, setSelectedAccount] = useState(activeAccount?.id);
  const { signOut } = useAuth();

  useEffect(() => {
    if (activeAccount && activeAccount.id.trim().length > 0) setSelectedAccount(activeAccount.id);
  }, [activeAccount]);

  return (
    <View>
      {/* <ScrollView> */}
      {accounts.map(account => {
        return (
          <Pressable
            key={account.id}
            style={[styles.row, styles.container]}
            onPress={() => {
              _setActiveId(account.id).then(() => {
                setTimeout(() => navigation.navigate('login'), 500);
              });
            }}
          >
            <View style={styles.row}>
              <Image source={require('../../../assets/avatar.png')} style={styles.avatar} />
              <AppText> {account.name}</AppText>
            </View>
            {selectedAccount == account.id && <Icon name="check" color={colors.green} />}
          </Pressable>
        );
      })}
      {/* </ScrollView> */}

      {showButtons && (
        <>
          <AppButton
            title="Create New Account"
            onPress={() => {
              signOut();
            }}
            outlined
          />
        </>
      )}
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
