import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../constants/colors';
import Home from '../screens/app/Home';
import { Icon } from '../components';
import LockedTransactions from '../screens/app/LockedTransactions';
import Swap from '../screens/app/Swap';
import ExportSeed from '../screens/settings/ExportSeed';

// import Home from '../screens/wallet/Home';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Wallet"
      screenOptions={{
        headerShown: false,
        indicatorStyle: {
          height: 0,
          backgroundColor: 'transparent'
        },
        tabBarShowLabel: true,
        initialRouteName: 'Home',
        tabBarActiveTintColor: colors.yellow,
        inactiveTintColor: '#757E90',
        tabStyle: {
          // paddingBottom: 8
          // paddingTop: 8
        },
        tabBarStyle: {
          backgroundColor: colors.white
        }
      }}
    >
      <Tab.Screen
        name="Wallet"
        component={Home}
        options={{
          tabBarLabel: 'Wallet',
          tabBarIcon: ({ color }) => <Icon name="wallet-outline" color={color} size={24} />
        }}
      />
      <Tab.Screen
        name="Swap"
        component={Swap}
        options={{
          tabBarLabel: 'Swap',
          tabBarIcon: ({ color }) => <Icon name="swap-horizontal" color={color} size={24} />
        }}
      />
      <Tab.Screen
        name="Locked Transactions"
        component={LockedTransactions}
        options={{
          tabBarLabel: 'Locked Txns',
          tabBarIcon: ({ color }) => <Icon name="sort-variant-lock" color={color} size={24} />
        }}
      />
      <Tab.Screen
        name="Settings"
        component={ExportSeed}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => <Icon name="cog-outline" color={color} size={24} />
        }}
      />
    </Tab.Navigator>
  );
}

// const styles = StyleSheet.create({});
