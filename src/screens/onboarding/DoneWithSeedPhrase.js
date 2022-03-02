/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import OnboardingProgress from '../../components/OnboardingProgress';
import Screen from '../../components/Screen';

export default function DoneWithSeedPhrase({ navigation }) {
  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <OnboardingProgress step={3} />

        <Image source={require('../../../assets/angryDoge.png')} style={styles.angryDoge} />
        <AppText bold medium style={{ marginVertical: 10 }}>
          Congratulations
        </AppText>

        <AppText grey>
          You've successfully protected your wallet. Remember to keep your seed phrase safe, it's your responsibility!
        </AppText>

        <TouchableOpacity style={styles.hintCta}>
          <AppText underlined bold blue>
            {' '}
            Leave yourself a hint?
          </AppText>
        </TouchableOpacity>

        <AppText grey>Air cannot recover your wallet should you lose it. You can find your seedphrase in</AppText>
        <AppText bold>{'Setting > Security & Privacy'}</AppText>

        <TouchableOpacity style={styles.hintCta}>
          <AppText underlined bold blue>
            {' '}
            Learn More
          </AppText>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', marginVertical: 10 }}>
        <AppButton title="Continue" onPress={() => navigation.navigate('confirmSeedPhrase')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  angryDoge: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 15
  },

  hintCta: {
    marginVertical: 15
  }
});
