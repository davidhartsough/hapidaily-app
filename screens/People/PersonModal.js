import React from 'react';
import { StyleSheet, View, Modal, Text } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import IconButtonGroup from '../../components/IconButtonGroup';
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
  validation: {
    marginLeft: -16,
    marginBottom: 16
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
    const buttons = [
      { name: 'checkmark', color: saveDisabled ? 'disabled' : 'primary', onPress: this._save },
      { name: 'close', color: 'iconDefault', onPress: close }
    ];
    if (deletePerson) {
      buttons.splice(1, 0, { name: 'trash', color: 'danger', onPress: deletePerson });
    }
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
          <FormValidationMessage containerStyle={styles.validation}>
            {errorMessage}
          </FormValidationMessage>
          <IconButtonGroup buttons={buttons} />
        </View>
      </Modal>
    );
  }
}
