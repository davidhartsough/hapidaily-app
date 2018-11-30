import React from 'react';
import { StyleSheet, View, Modal, FlatList, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import ListItem from './ListItem';

const styles = StyleSheet.create({
  view: {
    padding: 16,
    paddingTop: 64
  },
  title: {
    fontSize: 18,
    marginTop: 8,
    marginBottom: 8
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
          <SearchBar
            lightTheme
            onChangeText={this._onChangeText}
            onClearText={this._onClearText}
            value={searchInput}
            placeholder="Search"
            returnKeyType="search"
          />
          <FlatList
            data={this._filter(data)}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />
        </View>
      </Modal>
    );
  }
}
