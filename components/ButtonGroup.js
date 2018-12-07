import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from './Button';

const styles = StyleSheet.create({
  buttonGroup: {
    flex: 1
  },
  buttonView: {
    marginBottom: 4,
    marginTop: 12
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row'
  },
  button0View: {
    flex: 1,
    marginRight: 8
  },
  button1View: {
    flex: 1,
    marginLeft: 8
  }
});

export default ({ buttons }) => {
  if (buttons.length > 2) {
    return (
      <View style={styles.buttonGroup}>
        {buttons.map((btn, index) => (
          <View key={`${btn.title}-${btn.type}-${index}`} style={styles.buttonView}>
            <Button {...btn} />
          </View>
        ))}
      </View>
    );
  }
  return (
    <View style={styles.buttonRow}>
      {buttons.map((btn, index) => (
        <View key={`${btn.title}-${btn.type}-${index}`} style={styles[`button${index}View`]}>
          <Button {...btn} />
        </View>
      ))}
    </View>
  );
};
