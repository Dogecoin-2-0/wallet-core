import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import TokenDetailHeader from '../../components/wallet/TokenDetailHeader';
import SettingItem from '../../components/settings/SettingItem';

export default function Settings({ navigation }) {
  const categories = [
    {
      id: 1,
      label: 'Account',
      icon: 'account-circle-outline',
      link: 'comingSoon'
    },
    {
      id: 2,
      label: 'Transaction History',
      link: 'transactionHistory',
      icon: 'file-refresh-outline'
    },
    {
      id: 3,
      label: 'Share Public',
      icon: 'share-variant',
      link: 'comingSoon'
    },
    {
      id: 4,
      label: 'Settings',
      icon: 'cog-outline',
      link: 'innerSettings'
    },
    {
      id: 5,
      label: 'Get Help',
      icon: 'face-agent',
      link: 'comingSoon'
    },
    {
      id: 6,
      label: 'Send Feedback',
      icon: 'email-send-outline',
      link: 'comingSoon'
    }
  ];

  const listHeader = (
    <View style={styles.row}>
      <View />
      <AppText bold medium>
        Settings
      </AppText>
      <Image source={require('../../../assets/dogeroundedLogo.png')} style={styles.logo} />
    </View>
  );
  return (
    <Screen>
      <FlatList
        data={categories}
        ListHeaderComponent={listHeader}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <SettingItem
            icon={item.icon}
            label={item.label}
            onPress={() => navigation.navigate(item.link, { title: item.label })}
          />
        )}
        // ListFooterComponentStyle={styles.logout}
        // ListFooterComponent={<SettingItem label="Logout" icon="logout-variant" />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    width: 100,
    height: 100
  },
  logout: {
    marginTop: 20
  }
});
