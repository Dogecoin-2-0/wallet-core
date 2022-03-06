/* eslint-disable react/no-children-prop */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from 'react';
import { View } from 'react-native';
import { PortalProvider } from '@gorhom/portal';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import SeedPhraseValidator from '../../components/onboarding/SeedPhraseValidator';
import OnboardingProgress from '../../components/OnboardingProgress';
import AccountCreator from '../../components/onboarding/AccountCreator';
import ReusableBottomSheet from '../../components/extras/ReusableBottomSheet';
import Screen from '../../components/Screen';
import { useDispatch, useSelector } from 'react-redux';
import { updateName, clearPropagatebleState } from '../../redux/initializationSlice';
import { _saveAccount } from '../../storage';
import { useWalletFromMnemonic } from '../../hooks/wallet';
import { saveData } from '../../utils';
import ReusableSpinner from '../../components/extras/ReusableSpinner';
import ReusableAlert from '../../components/extras/ReusableAlert';
import { useAuth } from '../../contexts/auth';

export default function ConfirmSeedPhrase({ navigation }) {
  const modalRef = useRef(null);
  const [navigationEnabled, setNavigationEnabled] = useState(false);
  const [spinnerShown, setSpinnerShown] = useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { name, hashedPw } = useSelector(state => state.initializationReducer);
  const { phrase } = useSelector(state => state.phraseReducer);
  const dispatch = useDispatch();
  const { _wallet, mnemonicWallet } = useWalletFromMnemonic();
  const { signIn } = useAuth();

  const open = () => {
    modalRef.current?.open();
  };

  useEffect(() => {
    if (phrase) mnemonicWallet(phrase);
  }, [phrase]);

  // useEffect(() => {
  //   if (_wallet) console.log(_wallet);
  // }, [_wallet]);

  return (
    <PortalProvider>
      <Screen>
        <View style={{ flex: 1 }}>
          <OnboardingProgress step={2} onClose={() => navigation.goBack()} />
          <AppText bold medium style={{ marginVertical: 10 }}>
            Confirm Seed Phrase
          </AppText>

          <AppText grey>Select each word in the order it was presented to you</AppText>
        </View>

        <View style={{ flex: 2 }}>
          {/* <SeedPhraseWraper /> */}
          <SeedPhraseValidator enableNavigate={setNavigationEnabled} />
          <ReusableSpinner visible={!_wallet} />
          {/* <TemporaryValidator /> */}
        </View>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', marginVertical: 10 }}>
          <AppButton title="Continue" disable={navigationEnabled === false} onPress={open} />
        </View>
        <ReusableBottomSheet
          modalRef={modalRef}
          ratio={0.6}
          children={
            <>
              <AccountCreator
                onChangeText={text => dispatch(updateName(text))}
                onProceedClick={() => {
                  setSpinnerShown(true);
                  saveData(_wallet?.address)
                    .then(data => {
                      _saveAccount(hashedPw, name, _wallet?.address, phrase, _wallet?.privateKey).then(id => {
                        signIn(id);
                        clearPropagatebleState();
                        console.log('Data from server: ', data);
                      });
                    })
                    .catch(err => {
                      setAlertMessage(err.message);
                      setAlertShown(false);
                      setSpinnerShown(false);
                    });
                }}
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
              <ReusableSpinner visible={spinnerShown} />
            </>
          }
        />
      </Screen>
    </PortalProvider>
  );
}
