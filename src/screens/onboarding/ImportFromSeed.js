import { StyleSheet, Switch, Text, View } from 'react-native';
import React, {useState} from 'react';
import AppText from '../../components/AppText';
import AppPasswordInput from '../../components/forms/AppPasswordInput';
import colors from '../../constants/colors';

export default function ImportFromSeed() {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.container}>
      <AppText medium bold > Import From Seed</AppText> 

      <AppPasswordInput noPassword label={"New Password"}/>
      <AppPasswordInput noPassword label={"Confirm Password"}/> 

      <View style={styles.faceIdPromptContainer}>
          <AppText medium> Sign In with Face ID? </AppText>

          <Switch
            trackColor={{ false: colors.grey, true: colors.yellow }}
            thumbColor={isEnabled ? 'white' : colors.grey}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({

    container:{
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    faceIdPromptContainer: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
});
