import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';

export default function Screen({ children }) {
  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flex: 1
  }
});
