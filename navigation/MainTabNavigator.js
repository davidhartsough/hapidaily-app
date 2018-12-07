import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import Goals from '../screens/Goals';
import Impacts from '../screens/Impacts';
import People from '../screens/People';

const GoalsStack = createStackNavigator({ Goals });

GoalsStack.navigationOptions = {
  tabBarLabel: 'Goals',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-add-circle${focused ? '' : '-outline'}`}
    />
  )
};

const ImpactsStack = createStackNavigator({ Impacts });

ImpactsStack.navigationOptions = {
  tabBarLabel: 'Impacts',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-checkmark-circle${focused ? '' : '-outline'}`}
    />
  )
};

const PeopleStack = createStackNavigator({ People });

PeopleStack.navigationOptions = {
  tabBarLabel: 'People',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-people`} />
  )
};

export default createBottomTabNavigator({
  GoalsStack,
  ImpactsStack,
  PeopleStack
});
