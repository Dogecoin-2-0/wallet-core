import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import AppText from '../AppText';
import Icon from '../Icon';

export default function AppSeedWalletIn({ handleScanPress }) {
  const [focused, setFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(true);
  const toggleSecure = () => setIsSecure(previousState => !previousState);
  return (
    <>
      {focused && (
        <AppText grey small>
          Seed Phrase
        </AppText>
      )}
      <View style={[styles.container, focused && styles.focused]}>
        <View style={styles.inputContainer}>
          <TextInput
            // multiline  // for multiline text but it disables the secure textentry prop 
            autoCapitalize="none"
            autoCorrect={false}
            // numberOfLines={4} // not working as well
            placeholder="Seed phrase"
            secureTextEntry={isSecure}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
            style={styles.input}
          />
          <View style={styles.icons}>
            <TouchableOpacity onPress={toggleSecure}>
              <Icon name={isSecure ? 'eye-outline' : 'eye-off-outline'} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleScanPress}>
              <Icon name={'scan-helper'} size={20} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    paddingHorizontal: 5,
    justifyContent: 'center',
    backgroundColor: '#f3f3f3'
  },

  inputContainer: {
    // marginVertical: 5,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    fontSize: 16,
    width: '80%'
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginHorizontal: 5
  },
  focused: {
    borderWidth: 0.8,
    borderRadius: 20
  }
});
