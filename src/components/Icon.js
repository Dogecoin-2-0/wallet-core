import React from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import colors from '../constants/colors';

export default function Icon({ name, size, color, style, onPress }) {
  return (
    <View style={style}>
      <MaterialCommunityIcons
        name={name}
        size={size ? size : 25}
        color={color ? color : colors.black}
        onPress={onPress}
      />
    </View>
  );
}
