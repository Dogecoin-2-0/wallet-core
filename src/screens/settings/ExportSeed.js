/* eslint-disable react-native/no-inline-styles */
import { PortalProvider } from '@gorhom/portal';
import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Linking, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import * as ScreenCapture from 'expo-screen-capture';
import { TouchableOpacity } from 'react-native-gesture-handler';
import _ from 'lodash';
import AppButton from '../../components/AppButton';
import ReusableAlert from '../../components/extras/ReusableAlert';
import AppText from '../../components/AppText';
import Screen from '../../components/Screen';
import TokenDetailHeader from '../../components/wallet/TokenDetailHeader';
import { useActiveAccount } from '../../hooks/accounts';
import colors from '../../constants/colors';
import AppPasswordInput from '../../components/forms/AppPasswordInput';
import { comparePassword, hashPassword } from '../../utils';
import { _updatePw } from '../../storage';

export default function ExportSeed({ navigation }) {
  const width = Dimensions.get('screen').width / 3.5;
  const activeAccount = useActiveAccount();
  const [visible, setVisible] = useState(false);
  const [oldPw, setOldPw] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [oldPwMatch, setOldPwMatch] = useState(false);
  const [newPwMatch, setNewPwMatch] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const copySeedPhrase = () => Clipboard.setStringAsync(activeAccount?.seedPhrase);
  const changePw = () => {
    _updatePw(activeAccount?.id, hashPassword(newPassword))
      .then(() => {
        setShowAlert(true);
        setAlertMessage('Password successfully changed!');
        setOldPw('');
        setNewPassword('');
        setConfirmNewPassword('');
      })
      .catch(console.log);
  };

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

  useEffect(() => {
    if (confirmNewPassword || confirmNewPassword.trim().length > 0) {
      const hash = hashPassword(newPassword);
      const comparison = comparePassword(confirmNewPassword, hash);
      setNewPwMatch(comparison);
    }
  }, [confirmNewPassword]);

  useEffect(() => {
    if (oldPw || oldPw.trim().length > 0) {
      const comparison = comparePassword(oldPw, activeAccount?.pw);
      setOldPwMatch(comparison);
    }
  }, [oldPw]);

  return (
    <PortalProvider>
      <Screen>
        <TokenDetailHeader name="Settings" goBack={() => navigation.goBack()} />
        <ScrollView
          style={{ justifyContent: 'center', marginVertical: 15, flex: 1 }}
          contentContainerStyle={{ paddingVertical: 8 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
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

          <View style={{ marginTop: 12, justifyContent: 'center', alignItems: 'center' }}>
            <AppText small bold>
              Change Password
            </AppText>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'column',
                marginVertical: 30
              }}
            >
              <View>
                <AppPasswordInput onChangeText={setOldPw} value={oldPw} placeholder="Old Password" />
              </View>
              <View>
                <AppPasswordInput onChangeText={setNewPassword} value={newPassword} placeholder="New Password" />
              </View>
              <View>
                <AppPasswordInput
                  onChangeText={setConfirmNewPassword}
                  value={newPassword}
                  placeholder="Confirm New Password"
                />
              </View>
            </View>
          </View>
          <View>
            <AppButton disable={!oldPwMatch || !newPwMatch} title="Change" onPress={changePw} />
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.dogecoin2.org/privacypolicy/').then(console.log);
              }}
            >
              <AppText underlined yellow>
                Privacy Policy
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.dogecoin2.org/termsofservice/').then(console.log);
              }}
            >
              <AppText underlined yellow>
                Terms Of Service
              </AppText>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <ReusableAlert
          isSuccessful={true}
          message={alertMessage}
          visible={showAlert}
          close={() => {
            setShowAlert(false);
            setAlertMessage('');
          }}
        />
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
