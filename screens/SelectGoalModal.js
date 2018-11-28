import React from 'react';
import { StyleSheet, View, TextInput, Modal, FlatList } from 'react-native';
import PersonListItem from './PersonListItem';

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fff'
  }
});

export default class SelectGoalModal extends React.Component {
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

  _renderItem = ({ name }) => (
    <PersonListItem index={name} name={name} onPressItem={this._onPressItem} />
  );

  render() {
    const { visible, close, goals } = this.props;
    const { searchInput } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={close}
        style={styles.modal}
      >
        <View>
          <TextInput
            onChangeText={this._onChangeText}
            onSubmitEditing={this._search}
            value={searchInput}
            autoCapitalize
            maxLength={100}
            placeholder="Search"
            returnKeyType="done"
          />
          <FlatList data={goals} renderItem={this._renderItem} keyExtractor={this._keyExtractor} />
        </View>
      </Modal>
    );
  }
}
