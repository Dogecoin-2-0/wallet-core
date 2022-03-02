import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default function ReusableSpinner({ visible }) {
  return (
    <>
      {visible && (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.yellow} animating={visible} />
        </View>
      )}
    </>
  );
}
