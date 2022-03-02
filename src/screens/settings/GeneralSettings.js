import { ScrollView, StyleSheet } from 'react-native';
import React, { useMemo, useRef, useCallback } from 'react';
import AppText from '../../components/AppText';
import Screen from '../../components/Screen';
import TokenDetailHeader from '../../components/wallet/TokenDetailHeader';
import SelectBox from '../../components/settings/SelectBox';
import PrivacyCurrencySwitcher from '../../components/settings/PrivacyCurrencySwitcher';
import SearchEngineSwitch from '../../components/settings/SearchEngineSwitch';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import LanguageSwitch from '../../components/settings/LanguageSwitch';

export default function GeneralSettings({ navigation }) {
  const searchEngineSwitchRef = useRef(null);

  const handlePresentModalPress = useCallback(() => {
    searchEngineSwitchRef.current?.present();
  }, []);

  const onCloseSearchEngineSwitch = () => {
    searchEngineSwitchRef.current?.close();
  };

  const searchEngineSwitchSnapPoints = useMemo(() => ['30%', '50%'], []);

  const languageSwitchRef = useRef(null);

  const handlePresentLanguageSwitch = useCallback(() => {
    languageSwitchRef.current?.present();
  }, []);

  const onCloseLanguageSwitch = () => {
    languageSwitchRef.current?.close();
  };
  return (
    <Screen>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <BottomSheetModalProvider>
        <TokenDetailHeader name="General" goBack={() => navigation.goBack()} />

        <SelectBox title="Base Currency" selectedValue="USD - United States Dollar" />
        <AppText padded>Privacy Currency</AppText>
        <AppText grey small>
          Select Native to prioritize displaying values in the native currency of the chain (e.g. ETH). Select Fiat to
          prioritize displaying values in your selected fiat currency
        </AppText>

        <PrivacyCurrencySwitcher />
        <AppText padded>Current Language</AppText>
        <AppText grey small>
          Translate the application to a different supported language
        </AppText>
        <SelectBox title="Language" selectedValue="English" onPress={handlePresentLanguageSwitch} />
        <AppText padded> Search Engine</AppText>
        <AppText grey small>
          Change the default search engine used when entering search terms in the URL bar{' '}
        </AppText>
        <SelectBox title="Engine" selectedValue="Duck Duck Go" onPress={handlePresentModalPress} />

        <AppText> Account Identicon</AppText>
        <AppText grey small>
          You can customize your account
        </AppText>

        <SearchEngineSwitch
          innerRef={searchEngineSwitchRef}
          snapPoints={searchEngineSwitchSnapPoints}
          handleClose={() => {
            searchEngineSwitchRef.current?.close();
          }}
        />
        <LanguageSwitch
          innerRef={languageSwitchRef}
          snapPoints={['30%', '80%']}
          handleClose={() => {
            languageSwitchRef.current?.close();
          }}
        />
      </BottomSheetModalProvider>
      {/* </ScrollView> */}
    </Screen>
  );
}

const styles = StyleSheet.create({});
