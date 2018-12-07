import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import GoalsScreen from '../screens/Goals';
import ImpactsScreen from '../screens/Impacts';
import PeopleScreen from '../screens/People';

const GoalsStack = createStackNavigator({
  Goals: GoalsScreen
});

GoalsStack.navigationOptions = {
  tabBarLabel: 'Goals',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-add-circle${focused ? '' : '-outline'}`}
    />
  )
};

const ImpactsStack = createStackNavigator({
  Impacts: ImpactsScreen
});

ImpactsStack.navigationOptions = {
  tabBarLabel: 'Impacts',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-checkmark-circle${focused ? '' : '-outline'}`}
    />
  )
};

const PeopleStack = createStackNavigator({
  People: PeopleScreen
});

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
