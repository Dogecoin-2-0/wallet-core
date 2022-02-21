import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../constants/colors';
import Home from '../screens/app/Home';
import { Icon } from '../components';
// import Home from '../screens/wallet/Home';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Wallet"
      screenOptions={{
        headerShown: false,
        indicatorStyle: {
          height: 0
        },
        tabBarShowLabel: true,
        initialRouteName: 'Home',
        tabBarActiveTintColor: colors.yellow,
        inactiveTintColor: '#757E90',
        tabStyle: {
          // paddingBottom: 8
          // paddingTop: 8
        },
        indicatorStyle: {
          backgroundColor: 'transparent'
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
        name="Therapy"
        component={Home}
        options={{
          tabBarLabel: 'Swap',
          tabBarIcon: ({ color }) => <Icon name="swap-horizontal" color={color} size={24} />
        }}
      />
      <Tab.Screen
        name="Notes"
        component={Home}
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: ({ color }) => <Icon name="qrcode-scan" color={color} size={24} />
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Home}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => <Icon name="cog-outline" color={color} size={24} />
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
