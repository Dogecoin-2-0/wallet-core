/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import SeedPhraseWraper from '../../components/onboarding/SeedPhraseWraper';
import OnboardingProgress from '../../components/OnboardingProgress';
import Screen from '../../components/Screen';

export default function RevealSeedPhrase({ navigation }) {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <OnboardingProgress step={2} />
        <AppText bold medium style={{ marginVertical: 10 }}>
          Write down your seed phrase
        </AppText>

        <AppText grey>
          This is your seed phrase. Write it down on a paper and keep it in a safe place. You&apos;ll be asked to
          re-enter this phrase (in order) on the next step.
        </AppText>
      </View>

      <View style={{ flex: 2 }}>
        {visible ? (
          <SeedPhraseWraper isInit={true} />
        ) : (
          <TouchableOpacity onPress={toggleVisibility}>
            <Image source={require('../../../assets/seedphrase.png')} style={styles.image} />
          </TouchableOpacity>
        )}
      </View>
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', marginVertical: 10 }}>
        <AppButton title="Continue" onPress={() => navigation.navigate('confirmSeedPhrase')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center'
  }
});
