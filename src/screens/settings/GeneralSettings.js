import { StyleSheet } from 'react-native';
import React from 'react';
import AppText from '../../components/AppText';
import Screen from '../../components/Screen';
import TokenDetailHeader from '../../components/wallet/TokenDetailHeader';
import SelectBox from '../../components/settings/SelectBox';
import PrivacyCurrencySwitcher from '../../components/settings/PrivacyCurrencySwitcher';
import { PortalProvider } from '@gorhom/portal';
// import App from '../../../App';

export default function GeneralSettings({ navigation }) {
  return (
    <PortalProvider>
      <Screen>
        <TokenDetailHeader name="General" goBack={() => navigation.goBack()} />

        <SelectBox title="Base Currency" selectedValue="USD - United States Dollar" />
        <AppText padded>Privacy Currency</AppText>
        <AppText grey>
          Select Native to prioritize displaying values in the native currency of the chain (e.g. ETH). Select Fiat to
          prioritize displaying values in your selected fiat currency
        </AppText>

        <PrivacyCurrencySwitcher />
        <AppText padded>Current Language</AppText>
        <AppText grey>Translate the application to a different supported language</AppText>
        <SelectBox title="Language" selectedValue="English" />
        <AppText padded> Search Engine</AppText>
        <AppText grey> Change the default search engine used when entering search terms in the URL bar </AppText>
        <SelectBox title="Engine" selectedValue="Duck Duck Go" />
        <AppText> Account Identicon</AppText>
        <AppText grey> You can customize your account</AppText>
      </Screen>
    </PortalProvider>
  );
}

const styles = StyleSheet.create({});
