import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';

export default function Screen({ children }) {
  return (
    <SafeAreaView style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', flex: 1 }}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    flex: 1
  }
});
