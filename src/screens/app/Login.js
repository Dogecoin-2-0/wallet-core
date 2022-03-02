import { ImageBackground, PointPropType, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import AppPasswordInput from '../../components/forms/AppPasswordInput';

export default function Login() {
  return (
    <ImageBackground source={require('../../../assets/wallet-setupbg.jpg')} style={styles.background}>
      <View style={styles.container}>
        <AppText big bold padded white>
          Login
        </AppText>
        <AppText padded white>
          Welcome Back!
        </AppText>
        <AppText padded grey>
          Enter your password to continue
        </AppText>

        <AppPasswordInput label="Password" />
        <AppButton title="Login" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%'
    // paddingHorizontal: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20
  }
});
