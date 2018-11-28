import React from 'react';
import { StyleSheet, View, TextInput, Modal, Button } from 'react-native';

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fff'
  }
});

export default class AddPersonModal extends React.Component {
  state = {
    nameInput: ''
  };

  _cancel = () => {
    const { close } = this.props;
    close();
  };

  _onChangeText = nameInput => this.setState({ nameInput });

  _save = () => {
    const { save, close } = this.props;
    const { nameInput } = this.state;
    if (nameInput.length > 0) {
      save(nameInput);
    } else {
      close();
    }
  };

  render() {
    const { visible } = this.props;
    const { nameInput } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={this._cancel}
        style={styles.modal}
      >
        <View>
          <TextInput
            onChangeText={this._onChangeText}
            onSubmitEditing={this._save}
            value={nameInput}
            autoCapitalize
            maxLength={100}
            placeholder="Name"
            returnKeyType="done"
            textContentType="name"
          />
          <Button onPress={this._save} title="Save" />
          <Button onPress={this._cancel} title="Cancel" />
        </View>
      </Modal>
    );
  }
}
