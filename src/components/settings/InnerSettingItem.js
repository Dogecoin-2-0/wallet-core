import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AppText from '../AppText';
import { Icon } from '..';
import { BlurView } from 'expo-blur';

// import { TouchableOpacity } from '..';

export default function InnerSettingItem({ title, description, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <BlurView style={styles.row} intensity={60}>
        <View style={styles.textArea}>
          <AppText>{title}</AppText>
          <AppText small grey>
            {description}
          </AppText>
        </View>
        <Icon name="chevron-right" />
      </BlurView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    overflow: 'hidden',
    borderRadius: 10
  },
  row: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textArea: {
    paddingRight: 20
  }
});
