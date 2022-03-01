import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../constants/colors';

export default function SecurityLevel({ level }) {
  return (
    <View style={styles.container}>
      {!level && (
        <>
          <View style={styles.bar} />
        </>
      )}
      {level === 'WEAK' && (
        <>
          <View style={styles.weak} />
          <View style={styles.weak} />
        </>
      )}
      {level === 'FAIR' && (
        <>
          <View style={styles.fair} />
          <View style={styles.fair} />
          <View style={styles.fair} />
        </>
      )}
      {level === 'STRONG' && (
        <>
          <View style={styles.strong} />
          <View style={styles.strong} />
          <View style={styles.strong} />
          <View style={styles.strong} />
          <View style={styles.strong} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20
  },

  bar: {
    backgroundColor: colors.grey,
    height: 8,
    width: '10%',
    margin: 3,
    borderRadius: 5
  },
  weak: {
    backgroundColor: colors.red,
    height: 8,
    width: '10%',
    margin: 3,
    borderRadius: 5
  },
  fair: {
    backgroundColor: colors.yellow,
    height: 8,
    width: '10%',
    margin: 3,
    borderRadius: 5
  },
  strong: {
    backgroundColor: colors.green,
    height: 8,
    width: '10%',
    margin: 3,
    borderRadius: 5
  }
});
