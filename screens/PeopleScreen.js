import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import store from 'react-native-simple-store';
import PersonListItem from './PersonListItem';
import EditPersonModal from './EditPersonModal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default class PeopleScreen extends React.Component {
  static navigationOptions = {
    title: 'People',
  };

  state = {
    people: [],
    modalVisible: false,
    selectedPersonIndex: 0,
    selectedPersonName: '',
  };

  componentDidMount() {
    store.get('people').then(people => {
      if (people) {
        this.setState({ people });
      }
    });
  }

  _closeModal = () => {
    this.setState({ modalVisible: false });
  };

  _delete = () => {
    this.setState(state => {
      const { people, selectedPersonIndex } = state;
      people.splice(selectedPersonIndex, 1);
      return {
        modalVisible: false,
        people,
      };
    }).then(state => {
      store.save('people', state.people);
    });
  };

  _save = name => {
    this.setState(state => {
      const { people, selectedPersonIndex } = state;
      people[selectedPersonIndex] = name;
      return {
        modalVisible: false,
        people,
      };
    }).then(state => {
      store.save('people', state.people);
    });
  };

  _keyExtractor = (item, index) => item + index;

  _onPressItem = index => {
    this.setState(state => ({
      modalVisible: true,
      selectedPersonIndex: index,
      selectedPersonName: state.people[index],
    }));
  };

  _renderItem = ({ name, index }) => (
    <PersonListItem index={index} name={name} onPressItem={this._onPressItem} />
  );

  render() {
    const { modalVisible, people, selectedPersonName } = this.state;
    return (
      <View style={styles.container}>
        <EditPersonModal
          visible={modalVisible}
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
      </View>
    );
  }
}
