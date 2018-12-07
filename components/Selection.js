import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import SelectModal from './SelectModal';

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 8,
    marginTop: 16
  },
  select: {
    fontSize: 16,
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 2
  }
});

export default class Selection extends React.Component {
  state = { modalVisible: false };

  _openModal = () => {
    this.setState({ modalVisible: true });
  };

  _closeModal = () => {
    this.setState({ modalVisible: false });
  };

  _select = selection => {
    this.props.select(selection);
    this._closeModal();
  };

  render() {
    const { modalVisible } = this.state;
    const { data, name, currentSelection } = this.props;
    return (
      <View>
        <SelectModal
          visible={modalVisible}
          close={this._closeModal}
          select={this._select}
          data={data}
          name={name}
        />
        <Text style={styles.label}>{`Choose a ${name}`}</Text>
        <TouchableHighlight onPress={this._openModal}>
          <Text style={styles.select}>{currentSelection}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
