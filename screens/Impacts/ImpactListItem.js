import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  view: {
    padding: 16,
    backgroundColor: '#fff'
  },
  impactText: {
    fontSize: 16,
    marginBottom: 4
  },
  dateText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.54)'
  }
});

const getDate = milliseconds => new Date(milliseconds).toLocaleDateString();

export default ({ impact, date }) => (
  <View style={styles.view}>
    <Text style={styles.impactText}>{impact}</Text>
    <Text style={styles.dateText}>{getDate(date)}</Text>
  </View>
);
