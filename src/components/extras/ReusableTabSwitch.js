/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View } from 'react-native';
import _ from 'lodash';
import React, { useState } from 'react';
import AppText from '../AppText';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../constants/colors';
import { PortalProvider } from '@gorhom/portal';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ReusableTabSwitch({ tabs, header = null }) {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <PortalProvider>
      <View style={{ flex: 1 }}>
        {!!header && header}
        <View style={styles.tabsContainer}>
          {_.map(tabs, (item, index) => (
            <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => setSelectedTab(index)}>
              <View style={[selectedTab === index && styles.selectedTab]}>
                <AppText bold style={[styles.categoryText, selectedTab === index && styles.textSelectedTab]}>
                  {item.title}
                </AppText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.selectedComponentView}>
          <SafeAreaView style={{ flex: 1 }}>{tabs[selectedTab].component}</SafeAreaView>
        </View>
      </View>
    </PortalProvider>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 8,
    justifyContent: 'space-around'
  },
  textSelectedTab: {
    color: colors.yellow,
    paddingHorizontal: 15
  },
  selectedTab: {
    paddingBottom: 4,
    borderBottomWidth: 2.5,
    borderBottomColor: colors.yellow
  },
  selectedComponentView: {
    marginTop: 3,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
