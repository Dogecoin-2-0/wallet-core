import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AppText from '../AppText';
import { Icon } from '..';

export default function TokenDetailHeader({ name, image, goBack }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack}>
        <Icon name="chevron-left" size={30} />
      </TouchableOpacity>
      <AppText bold>{name} </AppText>
      <Image source={{ uri: image }} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 50
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  }
});
