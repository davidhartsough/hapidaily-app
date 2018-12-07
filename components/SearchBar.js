import React from 'react';
import { StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5'
  },
  input: {
    backgroundColor: '#eee',
    paddingLeft: 28
  }
});

export default ({ onChangeText, onClearText, searchInput }) => (
  <SearchBar
    icon={{ type: 'material', color: 'rgba(0, 0, 0, 0.5)', name: 'search' }}
    clearIcon={{
      name: 'clear',
      color: 'rgba(0, 0, 0, 0.5)',
      style: { paddingRight: 8, paddingLeft: 8 }
    }}
    placeholderTextColor="rgba(0, 0, 0, 0.5)"
    lightTheme
    onChangeText={onChangeText}
    onClearText={onClearText}
    value={searchInput}
    placeholder="Search"
    returnKeyType="search"
    containerStyle={styles.container}
    inputStyle={styles.input}
    round
  />
);
