import React from 'react';
import { StyleSheet, View, Modal, Text } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 24,
    paddingTop: 18
  },
  title: {
    fontSize: 18
  },
  label: {
    marginLeft: 0
  },
  inputContainer: {
    margin: 0,
    marginLeft: 0,
    marginRight: 0
  },
  input: {
    margin: 0,
    marginLeft: -4,
    marginRight: 0,
    paddingLeft: 4,
    color: 'rgba(0,0,0,0.9)'
  },
  actions: {
    flex: 1
  },
  actionsRow: {
    flex: 1,
    flexDirection: 'row'
  },
  buttonViewLeft: {
    flex: 1,
    marginRight: 8
  },
  buttonViewRight: {
    flex: 1,
    marginLeft: 8
  },
  buttonView: {
    marginBottom: 4,
    marginTop: 12
  },
  buttonContainer: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  button: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  buttonText: {
    letterSpacing: 0.5
  }
});

export default class PersonModal extends React.Component {
  state = {
    nameInput: '',
    errorMessage: '',
    saveDisabled: false
  };

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
    const { save, name, close } = this.props;
    const { nameInput } = this.state;
    if (name !== nameInput && nameInput.length > 0) {
      save(nameInput);
    } else if (name === nameInput && nameInput.length > 0) {
      close();
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
          <FormLabel labelStyle={styles.label}>Name</FormLabel>
          <FormInput
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            onChangeText={this._onChangeText}
            onSubmitEditing={this._save}
            value={nameInput}
            autoCapitalize="words"
            maxLength={100}
            placeholder="Name"
            returnKeyType="done"
            textContentType="name"
            underlineColorAndroid={Colors.tintColor}
          />
          <FormValidationMessage>{errorMessage}</FormValidationMessage>
          <View style={!deletePerson ? styles.actionsRow : styles.actions}>
            <View style={!deletePerson ? styles.buttonViewLeft : styles.buttonView}>
              <Button
                onPress={this._save}
                disabled={saveDisabled}
                title="SAVE"
                backgroundColor={Colors.tintColor}
                borderRadius={2}
                buttonStyle={styles.button}
                containerViewStyle={styles.buttonContainer}
                fontSize={14}
                fontWeight="500"
                textStyle={styles.buttonText}
              />
            </View>
            {!!deletePerson && (
              <View style={styles.buttonView}>
                <Button
                  onPress={deletePerson}
                  title="DELETE"
                  backgroundColor="rgb(225, 0, 80)"
                  borderRadius={2}
                  buttonStyle={styles.button}
                  containerViewStyle={styles.buttonContainer}
                  fontSize={14}
                  fontWeight="500"
                  textStyle={styles.buttonText}
                />
              </View>
            )}
            <View style={!deletePerson ? styles.buttonViewRight : styles.buttonView}>
              <Button
                onPress={close}
                title="CANCEL"
                backgroundColor="#e0e0e0"
                color="rgba(0, 0, 0, 0.87)"
                borderRadius={2}
                buttonStyle={styles.button}
                containerViewStyle={styles.buttonContainer}
                fontSize={14}
                fontWeight="500"
                textStyle={styles.buttonText}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
