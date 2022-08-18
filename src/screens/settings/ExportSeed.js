/* eslint-disable react-native/no-inline-styles */
import { PortalProvider } from '@gorhom/portal';
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import * as ScreenCapture from 'expo-screen-capture';
import { TouchableOpacity } from 'react-native-gesture-handler';
import _ from 'lodash';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import Screen from '../../components/Screen';
import TokenDetailHeader from '../../components/wallet/TokenDetailHeader';
import { useActiveAccount } from '../../hooks/accounts';
import colors from '../../constants/colors';

export default function ExportSeed({ navigation }) {
  const width = Dimensions.get('screen').width / 3.5;
  const activeAccount = useActiveAccount();
  const [visible, setVisible] = useState(false);

  const copySeedPhrase = () => Clipboard.setStringAsync(activeAccount?.seedPhrase);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await ScreenCapture.preventScreenCaptureAsync();
      })();

      return () => {
        setVisible(false);
        ScreenCapture.allowScreenCaptureAsync();
      };
    }, [])
  );

  return (
    <PortalProvider>
      <Screen>
        <TokenDetailHeader name="Settings" goBack={() => navigation.goBack()} />
        <View style={{ justifyContent: 'center', marginVertical: 24 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <AppText bold small>
              Your Seed Phrase
            </AppText>
            {visible ? (
              <View style={styles.seedContainer}>
                {!!activeAccount &&
                  _.map(activeAccount.seedPhrase.split(' '), (word, index) => (
                    <AppText style={{ width, margin: 2 }} key={index}>
                      {index + 1}. {word}
                    </AppText>
                  ))}
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: colors.ghostWhite,
                  paddingVertical: 45,
                  paddingHorizontal: 20,
                  marginVertical: 30
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.otherGray,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 25,
                    paddingVertical: 8,
                    paddingHorizontal: 8
                  }}
                  onPress={() => setVisible(true)}
                >
                  <AppText underlined bold>
                    Tap to reveal seed phrase
                  </AppText>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={{ marginVertical: 2 }}>
            {visible && <AppButton outlined title="Hide Seed Phrase" onPress={() => setVisible(false)} />}
          </View>
          <View style={{ marginVertical: 2 }}>
            {visible && <AppButton title="Copy Seed Phrase" onPress={copySeedPhrase} />}
          </View>

          <View style={{ marginVertical: 12, justifyContent: 'center', alignItems: 'center' }}>
            <AppText small bold>
              Change Password
            </AppText>
          </View>
        </View>
      </Screen>
    </PortalProvider>
  );
}

const styles = StyleSheet.create({
  seedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 30,
    alignItems: 'center'
  }
});
