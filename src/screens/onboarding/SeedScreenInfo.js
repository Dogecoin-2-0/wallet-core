/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { PortalProvider } from '@gorhom/portal';
import Icon from '../../components/Icon';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';

import OnboardingProgress from '../../components/OnboardingProgress';
import AppButton from '../../components/AppButton';
import SecurityLevel from '../../components/onboarding/SecurityLevel';
import BottomSheet from '../../components/extras/BottomSheet';

export default function SeedScreenInfo({ navigation }) {
  const modalRef = useRef(null);

  const onOpen = () => {
    modalRef.current?.open();
  };

  const onClose = () => {
    modalRef.current?.close();
  };

  const { pw } = useSelector(state => state.initializationReducer);
  const [level, setLevel] = useState(null);

  useEffect(() => {
    if (pw.trim().length > 0 && !!pw) {
      if (pw.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/)) setLevel('STRONG');
      else if (
        pw.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/) ||
        pw.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/)
      )
        setLevel('FAIR');
      else setLevel('WEAK');
    } else {
      setLevel(null);
    }
  }, [pw]);

  return (
    <PortalProvider>
      <Screen>
        <BottomSheet
          modalRef={modalRef}
          onClose={onClose}
          title="Protect your wallet"
          body="Dont’t risk losing your funds. Protect
your wallet by saving your seed phrase in a place you trust. 
It’s the only way to recover your wallet if you get locked out of the app or get a new device."
        />
        <OnboardingProgress step={2} onClose={() => navigation.goBack()} />
        <View style={styles.title}>
          <AppText bold medium>
            Secure your wallet
          </AppText>
        </View>
        <AppText> Secure your wallet's seed phrase</AppText>
        <TouchableOpacity style={styles.row} onPress={onOpen}>
          <Icon name={'help-circle-outline'} size={20} color="#4C70D0" />
          <AppText small underlined style={{ color: '#4C70D0', marginHorizontal: 20, marginVertical: 20 }}>
            Why it's Important?
          </AppText>
        </TouchableOpacity>

        <AppText grey> Write down your seed phrase on a piece of paper and store in a safe place</AppText>

        <View style={styles.row}>
          <AppText small grey>
            {' '}
            Security Level:{' '}
          </AppText>
          <AppText small green={level === 'STRONG'} red={level === 'WEAK'} yellow={level === 'FAIR'}>
            {level === 'WEAK' ? 'Weak' : level === 'STRONG' ? 'Strong' : 'Fair'}
          </AppText>
        </View>
        <SecurityLevel level={level} />

        <View>
          <AppText grey small>
            {' '}
            Risks Are:{' '}
          </AppText>
          <AppText grey small>
            {' '}
            - You lose it{' '}
          </AppText>
          <AppText grey small>
            - You forgot where you put it{' '}
          </AppText>
          <AppText grey small>
            {' '}
            - Someone else finds it{' '}
          </AppText>
          <AppText grey small style={{ marginVertical: 10 }}>
            {' '}
            Other options: Doesn't have to be on paper!
          </AppText>
          <AppText grey small>
            - Store in a bank vault
          </AppText>
          <AppText grey small>
            - Store in a safe
          </AppText>
          <AppText small grey>
            {' '}
            - Store in multiple secret places
          </AppText>
        </View>
        <View style={{ marginTop: 30 }}>
          <AppButton title="Start" onPress={() => navigation.navigate('revealSeedPhrase')} />
        </View>
      </Screen>
    </PortalProvider>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 40,
    marginBottom: 20
  },
  row: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center'
  }
});
