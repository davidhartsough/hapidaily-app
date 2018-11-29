import React from 'react';
import { StyleSheet, View, TextInput, Modal, FlatList, Text } from 'react-native';
import ListItem from './ListItem';
import Colors from '../constants/Colors';

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

  _search = () => {};

  _onPressItem = selection => {
    const { select } = this.props;
    select(selection);
  };

  _keyExtractor = (item, index) => item + index;

  _renderItem = ({ item }) => <ListItem index={item} name={item} onPressItem={this._onPressItem} />;

  render() {
    const { visible, close, data, name } = this.props;
    const { searchInput } = this.state;
    return (
      <Modal animationType="slide" transparent={false} visible={visible} onRequestClose={close}>
        <View style={styles.view}>
          <Text style={styles.title}>{`Select a ${name}`}</Text>
          <TextInput
            onChangeText={this._onChangeText}
            onSubmitEditing={this._search}
            value={searchInput}
            placeholder="Search"
            returnKeyType="search"
            underlineColorAndroid={Colors.tintColor}
          />
          <FlatList data={data} renderItem={this._renderItem} keyExtractor={this._keyExtractor} />
        </View>
      </Modal>
    );
  }
}
