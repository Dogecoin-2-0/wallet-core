import { ImageBackground, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import AppPasswordInput from '../../components/forms/AppPasswordInput';
import ReusableAlert from '../../components/extras/ReusableAlert';
import { useActiveAccount } from '../../hooks/accounts';
import { comparePassword } from '../../utils';

export default function Login({ navigation }) {
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const activeAccount = useActiveAccount();
  return (
    <ImageBackground source={require('../../../assets/wallet-setupbg.jpg')} style={styles.background}>
      <View style={styles.container}>
        <AppText big bold padded white>
          Login
        </AppText>
        <AppText padded white>
          Welcome Back!
        </AppText>

        <AppPasswordInput onChangeText={setPassword} label="Enter password to continue" />
        <AppButton
          disable={password.trim().length < 1}
          title="Login"
          onPress={() => {
            if (!comparePassword(password, activeAccount?.pw)) {
              setAlertMessage('Incorrect password!');
              setShowAlert(true);
            } else {
              navigation.navigate('home');
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
  }
});
