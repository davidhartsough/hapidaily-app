import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import ActionButton from 'react-native-action-button';
import store from 'react-native-simple-store';
import Colors from '../../constants/Colors';
import ListItem from '../../components/ListItem';
import PersonModal from './PersonModal';

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
      if (people && people.length) {
        this.setState({ people });
      }
    });
  }

  _closeEditModal = () => {
    this.setState({ editModalVisible: false });
  };

  _updateStore = () => {
    const { people } = this.state;
    store.save('people', people);
  };

  _delete = () => {
    this.setState(state => {
      const { people } = state;
      people.splice(this.selectedPersonIndex, 1);
      return {
        editModalVisible: false,
        people
      };
    }, this._updateStore);
  };

  _save = name => {
    this.setState(state => {
      const { people } = state;
      people[this.selectedPersonIndex] = name;
      return {
        editModalVisible: false,
        people
      };
    }, this._updateStore);
  };

  _keyExtractor = (item, index) => item + index;

  _onPressItem = index => {
    this.selectedPersonIndex = index;
    this.setState(state => ({
      editModalVisible: true,
      selectedPersonName: state.people[index]
    }));
  };

  _renderItem = ({ item, index }) => (
    <ListItem id={index} item={item} onPressItem={this._onPressItem} />
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
        <PersonModal
          visible={addModalVisible}
          save={this._addNewPerson}
          close={this._closeAddPersonModal}
          name=""
          title="Add"
          deletePerson={false}
        />
        <PersonModal
          visible={editModalVisible}
          save={this._save}
          close={this._closeModal}
          name={selectedPersonName}
          title="Edit"
          deletePerson={this._delete}
        />
        <FlatList
          data={people}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ListEmptyComponent={<Text>TODO: Import Contacts</Text>}
        />
        <ActionButton
          buttonColor={Colors.primaryRGBA}
          onPress={this._openAddPersonModal}
          position="center"
        />
      </View>
    );
  }
}
