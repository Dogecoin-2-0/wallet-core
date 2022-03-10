import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableOpacityBase, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import AppTextInput from './AppTextInput';
import colors from '../../constants/colors';
import AppText from '../AppText';
import Icon from '../Icon';

export default function AppSeedWalletIn({ navigation }) {
  const [focused, setFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(true);
  const toggleSecure = () => setIsSecure(previousState => !previousState);
  return (
    <View>
      {focused && (
        <AppText grey small>
          Seed Phrase
        </AppText>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Seed phrase"
          secureTextEntry={isSecure}
          onFocus={() => {
            setFocused(true);
          }}
        />
        <TouchableOpacity onPress={toggleSecure}>
          <Icon name={isSecure ? 'eye-outline' : 'eye-off-outline'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10
  },

  inputContainer: {
    backgroundColor: '#fff5ff',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 12.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 25
  },
  input: {
    fontSize: 16,
    width: '75%'
  }
});
