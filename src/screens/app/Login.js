import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import AppPasswordInput from '../../components/forms/AppPasswordInput';
import ReusableAlert from '../../components/extras/ReusableAlert';
import { useActiveAccount } from '../../hooks/accounts';
import { comparePassword } from '../../utils';
import { useFocusEffect } from '@react-navigation/native';

export default function Login({ navigation }) {
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const activeAccount = useActiveAccount();

  useFocusEffect(
    useCallback(() => {
      return () => {
        setPassword('');
      };
    }, [])
  );

  return (
    <ImageBackground source={require('../../../assets/wallet-setupbg.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Image source={require('../../../assets/dogeroundedLogo.png')} style={styles.logo} />
        <AppText big bold padded white>
          Login
        </AppText>
        <AppText padded white>
          Welcome Back!
        </AppText>

        <AppText grey> Enter your password below to continue</AppText>

        <AppPasswordInput
          onChangeText={setPassword}
          value={password}
          placeholder="Enter your password"
          // label="Enter password to continue"
          containerStyles={{
            borderRadius: 24
          }}
        />

        <AppButton
          disable={password.trim().length < 1}
          title="Login"
          onPress={() => {
            if (!comparePassword(password, activeAccount?.pw)) {
              setAlertMessage('Incorrect password!');
              setShowAlert(true);
            } else {
              navigation.replace('home');
            }
          }}
        />
        <ReusableAlert
          visible={showAlert}
          message={alertMessage}
          isSuccessful={false}
          close={() => {
            setShowAlert(false);
            setAlertMessage('');
          }}
        />
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
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'flex-end',
    marginBottom: 50
  }
});
