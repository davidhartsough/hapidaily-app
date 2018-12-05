import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import ImpactListItem from './ImpactListItem';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    paddingBottom: 16
  },
  searchBarContainer: {
    backgroundColor: '#F5F5F5'
  },
  input: {
    backgroundColor: '#eee',
    paddingLeft: 28
  },
  noResultsText: {
    padding: 16,
    fontSize: 14
  }
});

class ImpactsScreen extends React.Component {
  static navigationOptions = {
    title: 'Impacts'
  };

  state = {
    searchInput: ''
  };

  _onChangeText = searchInput => this.setState({ searchInput });

  _onClearText = () => this.setState({ searchInput: '' });

  _filter = data => data.filter(item => {
    const { searchInput } = this.state;
    return item.impact.toUpperCase().includes(searchInput.toUpperCase());
  });

  _keyExtractor = (item, index) => `${item.date}-${index}`;

  _renderItem = ({ item }) => <ImpactListItem impact={item.impact} date={item.date} />;

  render() {
    const { impacts } = this.props;
    const { searchInput } = this.state;
    if (!impacts.length) {
      return (
        <View style={styles.view}>
          <Text>Empty...</Text>
        </View>
      );
    }
    return (
      <View style={styles.view}>
        <FlatList
          data={this._filter(impacts)}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ListHeaderComponent={(
            <SearchBar
              icon={{ type: 'material', color: 'rgba(0, 0, 0, 0.5)', name: 'search' }}
              clearIcon={{
                name: 'clear',
                color: 'rgba(0, 0, 0, 0.5)',
                style: { paddingRight: 4, paddingLeft: 4 }
              }}
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
              lightTheme
              onChangeText={this._onChangeText}
              onClearText={this._onClearText}
              value={searchInput}
              placeholder="Search"
              returnKeyType="search"
              containerStyle={styles.searchBarContainer}
              inputStyle={styles.input}
              round
            />
          )}
          contentContainerStyle={styles.contentContainer}
          ListEmptyComponent={
            <Text style={styles.noResultsText}>{`No results for "${searchInput}".`}</Text>
          }
        />
      </View>
    );
  }
}

const mapStateToProps = ({ impacts }) => ({ impacts });

export default connect(mapStateToProps)(ImpactsScreen);
