/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import AppPasswordInput from '../../components/forms/AppPasswordInput';
import OnboardingProgress from '../../components/onboarding/OnboardingProgress';
import colors from '../../constants/colors';
import AppButton from '../../components/AppButton';
import CheckBox from '../../components/forms/CheckBox';

export default function CreateWallet({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const step = 1;

  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckBox = () => setIsChecked(!isChecked);

  return (
    <Screen>
      <OnboardingProgress step={step} onClose={() => navigation.goBack()} />
      <View style={styles.formArea}>
        <AppText bold medium>
          Create Password
        </AppText>
        <AppText grey> This password will unlock your Air wallet only on this service.</AppText>

        <AppPasswordInput label="New password" icon="eye" placeholder="****************" />
        <AppPasswordInput label="Confirm Password" icon="eye" placeholder="****************" />

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
          <AppButton title="Create Password" onPress={() => navigation.navigate('secureWallet')} />
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
