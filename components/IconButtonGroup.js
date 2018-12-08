import React from 'react';
import { StyleSheet, View } from 'react-native';
import IconButton from './IconButton';

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export default ({ buttons }) => (
  <View style={styles.containerView}>
    {buttons.map((btn, index) => (
      <View key={`${btn.name}-${index}`} style={styles.buttonView}>
        <IconButton {...btn} />
      </View>
    ))}
  </View>
);
