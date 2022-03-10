import React, { useState } from 'react';
import { View } from 'react-native';
import AppTextInput from './AppTextInput';

export default function AppPasswordInput({ label, onChangeText, text, containerStyles, placeholder }) {
  const [isSecure, setIsSecure] = useState(true);
  return (
    <View>
      <AppTextInput
        label={label}
        icon={isSecure ? 'eye-outline' : 'eye-off-outline'}
        iconAction={() => setIsSecure(secure => !secure)}
        placeholder={placeholder ? placeholder : '******'}
        secureTextEntry={isSecure}
        onChangeText={onChangeText}
        value={text}
        containerStyles={containerStyles}
      />
    </View>
  );
}
