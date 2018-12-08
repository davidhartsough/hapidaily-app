import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderStyle: 'solid'
  }
});

export default ({ onPress, name, color }) => (
  <Icon
    raised
    name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-${name}`}
    type="ionicon"
    color={Colors[color]}
    size={32}
    onPress={onPress}
    containerStyle={[styles.container, { borderColor: Colors[color] }]}
  />
);
