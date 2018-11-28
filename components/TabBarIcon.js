import React from 'react';
import { Icon } from 'expo';
import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  icon: {
    marginBottom: -3
  }
});

export default ({ name, focused }) => (
  <Icon.Ionicons
    name={name}
    size={26}
    style={styles.icon}
    color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
  />
);
