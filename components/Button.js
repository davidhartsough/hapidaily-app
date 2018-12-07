import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  button: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  buttonText: {
    letterSpacing: 0.5
  }
});

export default ({ onPress, title, type, disabled }) => (
  <Button
    onPress={onPress}
    title={title}
    backgroundColor={Colors[type]}
    color={type === 'default' ? 'rgba(0, 0, 0, 0.87)' : '#fff'}
    borderRadius={2}
    buttonStyle={styles.button}
    containerViewStyle={styles.buttonContainer}
    fontSize={14}
    fontWeight="500"
    textStyle={styles.buttonText}
    disabled={!!disabled}
  />
);
