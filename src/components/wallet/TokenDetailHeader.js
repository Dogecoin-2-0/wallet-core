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
      <AppText bold medium>
        {name}{' '}
      </AppText>
      <Image source={image && { uri: image }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  }
});
