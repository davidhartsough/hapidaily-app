import React from 'react';
import { StyleSheet, View, Modal, FlatList, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import ListItem from './ListItem';

const styles = StyleSheet.create({
  view: {
    padding: 0
  },
  title: {
    fontSize: 18,
    margin: 0,
    padding: 16,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderBottomWidth: 1
  },
  contentContainer: {
    paddingBottom: 80
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

export default class SelectModal extends React.Component {
  state = {
    searchInput: ''
  };

  _onChangeText = searchInput => this.setState({ searchInput });

  _onClearText = () => this.setState({ searchInput: '' });

  _filter = data => data.filter(item => {
    const { searchInput } = this.state;
    return item.toUpperCase().includes(searchInput.toUpperCase());
  });

  _onPressItem = selection => {
    const { select } = this.props;
    select(selection);
  };

  _keyExtractor = (item, index) => item + index;

  _renderItem = ({ item }) => <ListItem id={item} item={item} onPressItem={this._onPressItem} />;

  render() {
    const { visible, close, data, name } = this.props;
    const { searchInput } = this.state;
    return (
      <Modal animationType="slide" transparent={false} visible={visible} onRequestClose={close}>
        <View style={styles.view}>
          <Text style={styles.title}>{`Select a ${name}`}</Text>
          <FlatList
            data={this._filter(data)}
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
            ListEmptyComponent={
              <Text style={styles.noResultsText}>{`No results for "${searchInput}".`}</Text>
            }
            contentContainerStyle={styles.contentContainer}
          />
        </View>
      </Modal>
    );
  }
}
