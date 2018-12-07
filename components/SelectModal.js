import React from 'react';
import { StyleSheet, Modal, Text } from 'react-native';
import List from './List';

const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    margin: 0,
    padding: 16,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderBottomWidth: 1
  }
});

export default class SelectModal extends React.PureComponent {
  _onPressItem = selection => {
    const { select } = this.props;
    select(selection);
  };

  render() {
    const { visible, close, data, name } = this.props;
    return (
      <Modal animationType="slide" transparent={false} visible={visible} onRequestClose={close}>
        <Text style={styles.titleText}>{`Select a ${name}`}</Text>
        <List data={data} onPressItem={this._onPressItem} emptyStateText="" />
      </Modal>
    );
  }
}
