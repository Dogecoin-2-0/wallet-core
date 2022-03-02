import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../constants/colors';

export default function KeyPadComponent({ onKeyClick, onBackSpacePress }) {
  return (
    <View style={styles.keypadContainer}>
      {_.map(['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'], s => (
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
            flexShrink: 0,
            flexBasis: '33.3333%',
            height: 68
          }}
          key={s}
        >
          <TouchableOpacity style={{ width: '100%' }} onPress={() => onKeyClick(s)}>
            <AppText big>{s}</AppText>
          </TouchableOpacity>
        </View>
      ))}
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          flexShrink: 0,
          flexBasis: '33.3333%',
          height: 68
        }}
      >
        <TouchableOpacity style={{ width: '100%' }} onPress={onBackSpacePress}>
          <Icon name="backspace-outline" style={{ textAlign: 'center' }} color={colors.grey} />
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  keypadContainer: {
    borderRadius: 5,
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
    width: '100%',
    flexWrap: 'wrap',
    height: 296
  }
});