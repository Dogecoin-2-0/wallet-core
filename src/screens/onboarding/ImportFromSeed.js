/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react/no-children-prop */
/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View, Linking, Pressable } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import AppText from '../../components/AppText';
import AppPasswordInput from '../../components/forms/AppPasswordInput';
import AppSeedWalletInput from '../../components/forms/AppSeedWalletInput';
import AppButton from '../../components/AppButton';
import SecurityLevel from '../../components/onboarding/SecurityLevel';
import ReusableBottomSheet from '../../components/extras/ReusableBottomSheet';
import ReusableSpinner from '../../components/extras/ReusableSpinner';
import ReusableAlert from '../../components/extras/ReusableAlert';
import AccountCreator from '../../components/onboarding/AccountCreator';
import { hashPassword, comparePassword } from '../../utils';
import { useWalletFromMnemonic } from '../../hooks/wallet';
import { useAuth } from '../../contexts/auth';
import { saveData } from '../../utils';
import { PortalProvider } from '@gorhom/portal';
import { _saveAccount } from '../../storage';

export default function ImportFromSeed() {
  const [seedPhrase, setSeedPhrase] = useState('');
  const [level, setLevel] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwMatch, setPwMatch] = useState(false);
  const [name, setName] = useState('');
  const [alertShown, setAlertShown] = useState(false);
  const [spinnerShown, setSpinnerShown] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [hashedPw, setHashedPw] = useState('');
  const [walletInitialized, setWalletInitialized] = useState(false);
  const [walletReference, setWalletReference] = useState(null);

  const { _wallet, mnemonicWallet } = useWalletFromMnemonic();

  const { signIn } = useAuth();

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

  useEffect(() => {
    if (pwMatch) {
      setHashedPw(hashPassword(password));
    }
  }, [pwMatch]);

  useEffect(() => {
    if (_wallet && !_.eq(_wallet, walletReference)) {
      setWalletReference(_wallet);
      setWalletInitialized(false);
      openModal();
    }
  }, [_wallet]);

  return (
    <PortalProvider>
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
          {/* <View style={styles.row}>
            <AppText medium> Sign In with Face ID? </AppText>
            <Switch
              trackColor={{ false: colors.grey, true: colors.yellow }}
              thumbColor={isEnabled ? 'white' : colors.grey}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View> */}
        </View>
        <View style={{ flex: 1 }}>
          {/* <View style={styles.row}>
          <AppText small> By proceeding, you agree to these</AppText>
          <TouchableOpacity>
            <AppText small blue underlined>
              Terms and conditions
            </AppText>
          </TouchableOpacity>
        </View> */}
          <ReusableSpinner visible={walletInitialized} />
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <AppText small>By proceeding, you agree to these</AppText>
            <Pressable
              onPress={() => {
                Linking.openURL('https://www.dogecoin2.org/termsofservice/').then(console.log);
              }}
            >
              <AppText underlined yellow small>
                Terms Of Service
              </AppText>
            </Pressable>
          </View>
          <AppButton
            disable={
              !pwMatch ||
              seedPhrase.split(' ').length !== 12 ||
              (seedPhrase.split(' ').length === 12 && seedPhrase.split(' ')[11].trim().length === 0)
            }
            title="Import"
            onPress={() => {
              setWalletInitialized(true);
              try {
                if (seedPhrase.split(' ').length !== 12) {
                  throw new Error('Seed phrase should contain 12 words');
                }
                mnemonicWallet(seedPhrase);
              } catch (error) {
                setAlertMessage(error.message);
                setAlertShown(true);
                setWalletInitialized(false);
              }
            }}
          />
        </View>
        <ReusableBottomSheet
          modalRef={modalRef}
          ratio={0.6}
          children={
            <>
              <AccountCreator
                onChangeText={setName}
                onProceedClick={() => {
                  setSpinnerShown(true);
                  saveData(_wallet?.address)
                    .then(data => {
                      _saveAccount(hashedPw, name, _wallet?.address, seedPhrase, _wallet?.privateKey, data.id).then(
                        id => {
                          signIn(id);
                          console.log('Data from server: ', data);
                        }
                      );
                    })
                    .catch(err => {
                      setAlertMessage(err.message);
                      setAlertShown(true);
                      setSpinnerShown(false);
                    });
                }}
              />
              <ReusableSpinner visible={spinnerShown} />
            </>
          }
        />
        <ReusableAlert
          visible={alertShown}
          isSuccessful={false}
          message={alertMessage}
          close={() => {
            setAlertShown(false);
            setAlertMessage('');
          }}
        />
      </View>
    </PortalProvider>
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
