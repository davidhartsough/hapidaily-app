import React from 'react';
import { StyleSheet, View, TextInput, Modal, Button, Text } from 'react-native';
import Colors from '../../constants/Colors';

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
      <Modal animationType="slide" transparent={false} visible={visible} onRequestClose={close}>
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
            underlineColorAndroid={Colors.tintColor}
          />
          <View style={styles.actions}>
            <View style={styles.button}>
              <Button onPress={this._save} title="Save" />
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
