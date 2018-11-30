import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import store from 'react-native-simple-store';
import goals from '../../constants/goals';
import SelectModal from '../../components/SelectModal';

const getRandomItem = array => array[Math.floor(Math.random() * array.length)];

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 16,
    paddingTop: 64
  },
  label: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 8
  },
  select: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 8,
    padding: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    borderStyle: 'solid'
  },
  actions: {
    flex: 1,
    flexDirection: 'row'
  },
  button: {
    flex: 1,
    margin: 4,
    marginTop: 12
  }
});

export default class AddGoalModal extends React.Component {
  state = {
    goal: getRandomItem(goals),
    person: 'someone',
    people: ['someone'],
    goalModalVisible: false,
    personModalVisible: false
  };

  componentDidMount() {
    this._fetchPeople();
  }

  _fetchPeople = () => {
    store.get('people').then(people => {
      if (people && people.length) {
        this.setState({
          people,
          person: getRandomItem(people)
        });
      }
    });
  };

  _save = () => {
    const { save } = this.props;
    const { goal, person } = this.state;
    save(goal, person);
  };

  _selectGoal = goal => {
    this.setState({
      goal,
      goalModalVisible: false
    });
  };

  _selectPerson = person => {
    this.setState({
      person,
      personModalVisible: false
    });
  };

  _openGoalSelect = () => {
    this.setState({ goalModalVisible: true });
  };

  _closeGoalSelect = () => {
    this.setState({ goalModalVisible: false });
  };

  _openPersonSelect = () => {
    this.setState({ personModalVisible: true });
  };

  _closePersonSelect = () => {
    this.setState({ personModalVisible: false });
  };

  render() {
    const { visible, close } = this.props;
    const { goal, person, goalModalVisible, personModalVisible, people } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={close}
        onShow={this._fetchPeople}
      >
        <View style={styles.view}>
          <SelectModal
            visible={goalModalVisible}
            close={this._closeGoalSelect}
            select={this._selectGoal}
            data={goals}
            name="goal"
          />
          <SelectModal
            visible={personModalVisible}
            close={this._closePersonSelect}
            select={this._selectPerson}
            data={people}
            name="person"
          />
          <View>
            <Text style={styles.label}>Choose a goal</Text>
            <TouchableHighlight onPress={this._openGoalSelect}>
              <Text style={styles.select}>{goal}</Text>
            </TouchableHighlight>
          </View>
          <View>
            <Text style={styles.label}>Choose a person</Text>
            <TouchableHighlight onPress={this._openPersonSelect}>
              <Text style={styles.select}>{person}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.actions}>
            <View style={styles.button}>
              <Button onPress={this._save} title="Save" />
            </View>
            <View style={styles.button}>
              <Button onPress={close} title="Cancel" />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
