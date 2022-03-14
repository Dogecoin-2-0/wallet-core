/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Switch, View } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import AppText from '../../components/AppText';
import AppPasswordInput from '../../components/forms/AppPasswordInput';
import colors from '../../constants/colors';
import AppSeedWalletInput from '../../components/forms/AppSeedWalletInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppButton from '../../components/AppButton';
import SecurityLevel from '../../components/onboarding/SecurityLevel';
import { hashPassword, comparePassword } from '../../utils';
import { useWalletFromMnemonic } from '../../hooks/wallet';

export default function ImportFromSeed({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [seedPhrase, setSeedPhrase] = useState('');
  const [level, setLevel] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwMatch, setPwMatch] = useState(false);

  const { _wallet, mnemonicWallet } = useWalletFromMnemonic();

  const modalRef = useRef(null);

  const openModal = () => {
    modalRef.current?.open();
  };

  useEffect(() => {
    if (password.trim().length > 0) {
      if (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/)) setLevel('STRONG');
      else if (
        password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/) ||
        password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/)
      )
        setLevel('FAIR');
      else setLevel('WEAK');
    } else {
      setLevel(null);
    }
  }, [password]);

  useEffect(() => {
    if (confirmPassword || confirmPassword.trim().length > 0) {
      const hash = hashPassword(password);
      const comparison = comparePassword(confirmPassword, hash);
      setPwMatch(comparison);
    }
  }, [confirmPassword, password]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <AppText medium bold>
          Import From Seed
        </AppText>

        <AppSeedWalletInput value={seedPhrase} handleSeedEnter={setSeedPhrase} />
        <AppPasswordInput text={password} onChangeText={setPassword} label={'New Password'} />
        <AppText grey> Password Strength: </AppText>
        <SecurityLevel level={level} />
        <AppPasswordInput text={confirmPassword} onChangeText={setConfirmPassword} label={'Confirm Password'} />
        {password.trim().length > 0 && confirmPassword.trim().length > 0 && (
          <>
            <AppText red={!pwMatch} green={pwMatch}>
              {pwMatch ? 'Passwords match!' : 'Passwords do not match!'}
            </AppText>
          </>
        )}
        <View style={styles.row}>
          <AppText medium> Sign In with Face ID? </AppText>
          <Switch
            trackColor={{ false: colors.grey, true: colors.yellow }}
            thumbColor={isEnabled ? 'white' : colors.grey}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.row}>
          <AppText small> By proceeding, you agree to these</AppText>
          <TouchableOpacity>
            <AppText small blue underlined>
              Terms and conditions
            </AppText>
          </TouchableOpacity>
        </View>
        <AppButton title="Import" onPress={() => navigation.navigate('confirmSeedPhrase')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    // flex: 1,
    alignContent: 'space-between'
  },
  row: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
