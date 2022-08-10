import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../constants/colors';
import Home from '../screens/app/Home';
import { Icon } from '../components';
import InnerSettings from '../screens/settings/InnerSettings';

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
        name="Settings"
        component={InnerSettings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => <Icon name="cog-outline" color={color} size={24} />
        }}
      />
    </Tab.Navigator>
  );
}

// const styles = StyleSheet.create({});
