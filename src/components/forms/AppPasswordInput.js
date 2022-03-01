import React, { useState } from 'react';
import { View } from 'react-native';
import AppText from '../AppText';
import SecurityLevel from '../onboarding/SecurityLevel';
import AppTextInput from './AppTextInput';

export default function AppPasswordInput({ label, onChangeText, text }) {
  const [isSecure, setIsSecure] = useState(true);
  return (
    <View>
      <AppTextInput
        label={label}
        icon={isSecure ? 'eye-outline' : 'eye-off-outline'}
        iconAction={() => setIsSecure(secure => !secure)}
        placeholder="******"
        secureTextEntry={isSecure}
        onChangeText={onChangeText}
        value={text}
      />
    </View>
  );
}
