import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import GoalsScreen from '../screens/GoalsScreen';
import CreateGoalScreen from '../screens/CreateGoalScreen';
import ImpactsScreen from '../screens/ImpactsScreen';
import PeopleScreen from '../screens/PeopleScreen';

const GoalsStack = createStackNavigator({
  Goals: GoalsScreen,
  CreateGoal: CreateGoalScreen,
});

GoalsStack.navigationOptions = {
  tabBarLabel: 'Goals',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-add-circle${focused ? '' : '-outline'}`}
    />
  ),
};

const ImpactsStack = createStackNavigator({
  Impacts: ImpactsScreen,
});

ImpactsStack.navigationOptions = {
  tabBarLabel: 'Impacts',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-checkmark-circle${focused ? '' : '-outline'}`}
    />
  ),
};

const PeopleStack = createStackNavigator({
  People: PeopleScreen,
});

PeopleStack.navigationOptions = {
  tabBarLabel: 'People',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-people`} />
  ),
};

export default createBottomTabNavigator({
  GoalsStack,
  ImpactsStack,
  PeopleStack,
});
