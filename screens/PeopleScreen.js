import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import ActionButton from 'react-native-action-button';
import store from 'react-native-simple-store';
import Colors from '../constants/Colors';
import PersonListItem from './PersonListItem';
import EditPersonModal from './EditPersonModal';
import AddPersonModal from './AddPersonModal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default class PeopleScreen extends React.Component {
  static navigationOptions = {
    title: 'People'
  };

  constructor(props) {
    super(props);
    this.state = {
      people: [],
      editModalVisible: false,
      addModalVisible: false,
      selectedPersonName: ''
    };
    this.selectedPersonIndex = 0;
  }

  componentDidMount() {
    store.get('people').then(people => {
      if (people) {
        this.setState({ people });
      }
    });
  }

  _closeEditModal = () => {
    this.setState({ editModalVisible: false });
  };

  _delete = () => {
    this.setState(state => {
      const { people } = state;
      people.splice(this.selectedPersonIndex, 1);
      return {
        editModalVisible: false,
        people
      };
    }).then(state => {
      store.save('people', state.people);
    });
  };

  _save = name => {
    this.setState(state => {
      const { people } = state;
      people[this.selectedPersonIndex] = name;
      return {
        editModalVisible: false,
        people
      };
    }).then(state => {
      store.save('people', state.people);
    });
  };

  _keyExtractor = (item, index) => item + index;

  _onPressItem = index => {
    this.selectedPersonIndex = index;
    this.setState(state => ({
      editModalVisible: true,
      selectedPersonName: state.people[index]
    }));
  };

  _renderItem = ({ name, index }) => (
    <PersonListItem index={index} name={name} onPressItem={this._onPressItem} />
  );

  _openAddPersonModal = () => {
    this.setState({ addModalVisible: true });
  };

  _closeAddPersonModal = () => {
    this.setState({ addModalVisible: false });
  };

  _addNewPerson = name => {
    this.setState(state => {
      const { people } = state;
      people.push(name);
      return {
        addModalVisible: false,
        people
      };
    });
    store.push('people', name);
  };

  render() {
    const { addModalVisible, editModalVisible, people, selectedPersonName } = this.state;
    return (
      <View style={styles.container}>
        <AddPersonModal
          visible={addModalVisible}
          save={this._addNewPerson}
          close={this._closeAddPersonModal}
        />
        <EditPersonModal
          visible={editModalVisible}
          deletePerson={this._delete}
          save={this._save}
          name={selectedPersonName}
          close={this._closeModal}
        />
        {people.length ? (
          <FlatList data={people} renderItem={this._renderItem} keyExtractor={this._keyExtractor} />
        ) : (
          <View>
            <Text>Got nothing yet hombre</Text>
          </View>
        )}
        <ActionButton
          buttonColor={Colors.primaryRGBA}
          onPress={this._openAddPersonModal}
          position="center"
        />
      </View>
    );
  }
}