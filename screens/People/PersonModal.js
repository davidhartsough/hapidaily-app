import React from 'react';
import { StyleSheet, View, Modal, Text } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 16,
    paddingTop: 64
  },
  title: {
    fontSize: 18,
    marginTop: 8,
    marginBottom: 8
  },
  actions: {
    flex: 1
  },
  button: {
    margin: 4,
    marginTop: 12
  }
});

export default class PersonModal extends React.Component {
  state = { nameInput: '', errorMessage: '', saveDisabled: false };

  _updateState = () => {
    const { name } = this.props;
    this.setState({ nameInput: name });
  };

  _onChangeText = nameInput => {
    const errorMessage = nameInput.length === 0 ? 'Please enter a name' : '';
    const saveDisabled = nameInput.length === 0;
    this.setState({ nameInput, errorMessage, saveDisabled });
  };

  _save = () => {
    const { save, name } = this.props;
    const { nameInput } = this.state;
    if (name !== nameInput && nameInput.length > 0) {
      save(nameInput);
    }
  };

  render() {
    const { visible, close, title, deletePerson } = this.props;
    const { nameInput, errorMessage, saveDisabled } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={close}
        onShow={this._updateState}
      >
        <View style={styles.view}>
          <Text style={styles.title}>{title}</Text>
          <FormLabel>Name</FormLabel>
          <FormInput
            onChangeText={this._onChangeText}
            onSubmitEditing={this._save}
            value={nameInput}
            autoCapitalize="words"
            maxLength={100}
            placeholder="Name"
            returnKeyType="done"
            textContentType="name"
          />
          <FormValidationMessage>{errorMessage}</FormValidationMessage>
          <View style={styles.actions}>
            <View style={styles.button}>
              <Button onPress={this._save} disabled={saveDisabled} title="Save" />
            </View>
            {!!deletePerson && (
              <View style={styles.button}>
                <Button onPress={deletePerson} title="Delete" />
              </View>
            )}
            <View style={styles.button}>
              <Button onPress={close} title="Cancel" />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
