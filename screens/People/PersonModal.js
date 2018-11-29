import React from 'react';
import { StyleSheet, View, TextInput, Modal, Button, Text } from 'react-native';

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fff'
  },
  view: {
    padding: 16,
    paddingTop: 64
  },
  title: {
    fontSize: 18,
    marginTop: 8,
    marginBottom: 8
  },
  button: {
    margin: 4,
    marginTop: 12
  }
});

export default class PersonModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nameInput: props.name };
  }

  _onChangeText = nameInput => this.setState({ nameInput });

  _save = () => {
    const { save, close, name } = this.props;
    const { nameInput } = this.state;
    if (name !== nameInput && nameInput.length > 0) {
      save(nameInput);
    } else {
      close();
    }
  };

  render() {
    const { visible, close, title, deletePerson } = this.props;
    const { nameInput } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={close}
        style={styles.modal}
      >
        <View style={styles.view}>
          <Text style={styles.title}>{title}</Text>
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
          <Button onPress={this._save} title="Save" style={styles.button} />
          {!!deletePerson && <Button onPress={deletePerson} title="Delete" style={styles.button} />}
          <Button onPress={close} title="Cancel" style={styles.button} />
        </View>
      </Modal>
    );
  }
}
