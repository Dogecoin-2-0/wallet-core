import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppText from '../../components/AppText';

export default function ImportFromSeed() {
  return (
    <View style={styles.container}>
      <AppText medium bold > Import From Seed</AppText>
    </View>
  );
}

const styles = StyleSheet.create({

    container:{
        paddingHorizontal: 20,
        paddingVertical: 30
    }
});
