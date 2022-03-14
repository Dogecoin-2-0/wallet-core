/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import AppPasswordInput from '../../components/forms/AppPasswordInput';
import OnboardingProgress from '../../components/onboarding/OnboardingProgress';
import colors from '../../constants/colors';
import AppButton from '../../components/AppButton';
import CheckBox from '../../components/forms/CheckBox';
import SecurityLevel from '../../components/onboarding/SecurityLevel';
import { hashPassword, comparePassword } from '../../utils';
import { updateHashedPw, updatePw } from '../../redux/initializationSlice';

export default function CreateWallet({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [level, setLevel] = useState(null);
  const [pwMatch, setPwMatch] = useState(false);
  const dispatch = useDispatch();
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const step = 1;

  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckBox = () => setIsChecked(!isChecked);

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
    <Screen>
      <OnboardingProgress step={step} onClose={() => navigation.goBack()} />
      <View style={styles.formArea}>
        <AppText bold medium>
          Create Password
        </AppText>
        <AppText grey>This password will unlock your wallet only on this service.</AppText>

        <AppPasswordInput label="New password" onChangeText={setPassword} value={password} />
        <AppText grey> Password Strength: </AppText>
        <SecurityLevel level={level} />
        <AppPasswordInput label="Confirm Password" onChangeText={setConfirmPassword} value={confirmPassword} />
        {password.trim().length > 0 && confirmPassword.trim().length > 0 && (
          <>
            <AppText red={!pwMatch} green={pwMatch}>
              {pwMatch ? 'Passwords match!' : 'Passwords do not match!'}
            </AppText>
          </>
        )}

        <View style={styles.faceIdPromptContainer}>
          <AppText medium> Sign In with Face ID? </AppText>

          <Switch
            trackColor={{ false: colors.grey, true: colors.yellow }}
            thumbColor={isEnabled ? 'white' : colors.grey}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        <View style={styles.faceIdPromptContainer}>
          <CheckBox checked={isChecked} onPress={toggleCheckBox} />
          <AppText style={{ fontSize: 14, padding: 25 }}>
            I understand that the Doge2 Foundation cannot recover this password for me. Learn more{' '}
          </AppText>
        </View>

        <View style={{ marginTop: 10 }}>
          <AppButton
            title="Create Password"
            disable={!pwMatch || password.trim().length === 0 || confirmPassword.trim().length === 0 || !isChecked}
            onPress={() => {
              dispatch(updateHashedPw(hashPassword(password)));
              dispatch(updatePw(password));
              navigation.navigate('secureWallet');
            }}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  formArea: {
    marginTop: 40
  },
  faceIdPromptContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
