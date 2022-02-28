import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import TokenDetailHeader from '../../components/wallet/TokenDetailHeader';

export default function ComingSoon({ route, navigation }) {
  return (
    <Screen>
      <TokenDetailHeader name={route.params.title} goBack={() => navigation.goBack()} />
      <View style={styles.container}>
        <AppText big bold yellow>
          Coming Soon
        </AppText>
        <AppText centered>Hey, Don't wait too long... This Feature is coming soon in an update</AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
