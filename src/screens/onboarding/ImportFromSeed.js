import { StyleSheet, Switch, Text, View } from 'react-native';
import React, { useState } from 'react';
import AppText from '../../components/AppText';
import AppPasswordInput from '../../components/forms/AppPasswordInput';
import colors from '../../constants/colors';
import AppSeedWalletInput from '../../components/forms/AppSeedWalletInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppButton from '../../components/AppButton';

export default function ImportFromSeed({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <AppText medium bold>
          Import From Seed
        </AppText>

        <AppSeedWalletInput />
        <AppPasswordInput noPassword label={'New Password'} />
        <AppPasswordInput noPassword label={'Confirm Password'} />
        <View style={styles.row}>
          <AppText medium> Sign In with Face ID? </AppText>
          <Switch
            trackColor={{ false: colors.grey, true: colors.yellow }}
            thumbColor={isEnabled ? 'white' : colors.grey}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.row}>
          <AppText small> By proceeding, you agree to these</AppText>
          <TouchableOpacity>
            <AppText small blue underlined>
              Terms and conditions
            </AppText>
          </TouchableOpacity>
        </View>
        <AppButton title="Import" onPress={() => navigation.navigate('confirmSeedPhrase')} />
      </View>
    </View>
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
