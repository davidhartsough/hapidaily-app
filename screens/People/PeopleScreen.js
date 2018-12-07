import React from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import Colors from '../../constants/Colors';
import List from '../../components/List';
import PersonModal from './PersonModal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    paddingBottom: 64
  }
});

export default class PeopleScreen extends React.Component {
  static navigationOptions = {
    title: 'People'
  };

  state = {
    editModalVisible: false,
    addModalVisible: false,
    selectedPersonIndex: 0
  };

  _closeEditModal = () => {
    this.setState({ editModalVisible: false });
  };

  _delete = () => {
    this.props.deletePerson(this.state.selectedPersonIndex);
    this._closeEditModal();
  };

  _save = name => {
    this.props.updatePerson(this.state.selectedPersonIndex, name);
    this._closeEditModal();
  };

  _onPressItem = person => {
    this.setState({
      editModalVisible: true,
      selectedPersonIndex: this.props.people.findIndex(name => name === person)
    });
  };

  _openAddPersonModal = () => {
    this.setState({ addModalVisible: true });
  };

  _closeAddPersonModal = () => {
    this.setState({ addModalVisible: false });
  };

  _addNewPerson = name => {
    this.props.createPerson(name);
    this._closeAddPersonModal();
  };

  render() {
    const { people } = this.props;
    const { addModalVisible, editModalVisible, selectedPersonIndex } = this.state;
    return (
      <View style={styles.container}>
        <PersonModal
          visible={addModalVisible}
          save={this._addNewPerson}
          close={this._closeAddPersonModal}
          name=""
          title="Add Person"
          deletePerson={false}
        />
        <PersonModal
          visible={editModalVisible}
          save={this._save}
          close={this._closeEditModal}
          name={people[selectedPersonIndex]}
          title="Edit Person"
          deletePerson={this._delete}
        />
        <List
          data={people.sort()}
          onPressItem={this._onPressItem}
          emptyStateText="Here you'll have a list of people you want to have a positive impact on. Add people to include them in your goals."
        />
        <ActionButton
          buttonColor={Colors.primaryRGBA}
          onPress={this._openAddPersonModal}
          position="right"
        />
      </View>
    );
  }
}
