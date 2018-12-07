import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import SearchBar from './SearchBar';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    paddingBottom: 16
  },
  text: {
    padding: 24,
    fontSize: 16
  }
});

export default class SearchableList extends React.Component {
  state = { searchInput: '' };

  _onChangeText = searchInput => this.setState({ searchInput });

  _onClearText = () => this.setState({ searchInput: '' });

  render() {
    const { data, dataFilter, renderItem, keyExtractor, emptyStateText } = this.props;
    const { searchInput } = this.state;
    return (
      <View style={styles.view}>
        {data.length ? (
          <FlatList
            data={dataFilter(data, searchInput)}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ListHeaderComponent={(
              <SearchBar
                onChangeText={this._onChangeText}
                onClearText={this._onClearText}
                searchInput={searchInput}
              />
            )}
            contentContainerStyle={styles.contentContainer}
            ListEmptyComponent={
              <Text style={styles.text}>{`No results for "${searchInput}".`}</Text>
            }
          />
        ) : (
          <Text style={styles.text}>{emptyStateText}</Text>
        )}
      </View>
    );
  }
}
