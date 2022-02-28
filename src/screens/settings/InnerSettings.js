import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppText from '../../components/AppText';
import Screen from '../../components/Screen';
import InnerSettingItem from '../../components/settings/InnerSettingItem';
import TokenDetailHeader from '../../components/wallet/TokenDetailHeader';

export default function InnerSettings({ navigation }) {
  const innerSettings = [
    {
      title: 'General',
      description: 'Currency conversion, primary currency, language and search engine ',
      link: 'generalSettings'
    },
    {
      title: 'Security and Privacy',
      description: 'Currency conversion, primary currency, language and search engine '
    },
    {
      title: 'Advanced',
      description: 'Currency conversion, primary currency, language and search engine '
    },
    {
      title: 'Contacts',
      description: 'Currency conversion, primary currency, language and search engine '
    },
    {
      title: 'Networks',
      description: 'Currency conversion, primary currency, language and search engine '
    },
    {
      title: 'Experimental',
      description: 'Currency conversion, primary currency, language and search engine '
    }
  ];
  return (
    <ImageBackground source={require('../../../assets/settings.png')} style={styles.background}>
      <Screen transparent>
        <TokenDetailHeader goBack={() => navigation.goBack()} />
        <View style={styles.body}>
          <FlatList
            data={innerSettings}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <InnerSettingItem
                  title={item.title}
                  description={item.description}
                  onPress={() => navigation.navigate(item.link)}
                />
              );
            }}
          />
        </View>
      </Screen>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  body: {
    marginTop: 40
  }
});
