import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AppText from '../AppText';
import { Icon } from '..';
import colors from '../../constants/colors';

export default function PrivacyCurrencySwitcher() {
  const [selected, setSelected] = React.useState('Native');
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.row} onPress={() => setSelected('Native')}>
        <Icon
          name={selected == 'Native' ? 'radiobox-marked' : 'radiobox-blank'}
          color={selected == 'Native' ? colors.yellow : colors.grey}
        />
        <AppText> Native</AppText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row} onPress={() => setSelected('Fiat')}>
        <Icon
          name={selected == 'Fiat' ? 'radiobox-marked' : 'radiobox-blank'}
          color={selected == 'Fiat' ? colors.yellow : colors.grey}
        />
        <AppText> Fiat</AppText>
      </TouchableOpacity>
      <View />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
    // alignItems: 'rig'
    // marginRight: 10
  }
});
