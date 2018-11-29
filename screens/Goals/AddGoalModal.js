import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableHighlight, Button } from 'react-native';
import store from 'react-native-simple-store';
import goals from '../../constants/goals';
import SelectModal from '../../components/SelectModal';

const getRandomItem = array => array[Math.floor(Math.random() * array.length)];

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fff'
  },
  view: {
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
    border: '1px solid #000'
  },
  button: {
    margin: 4,
    marginTop: 12
  }
});

export default class AddGoalModal extends React.Component {
  state = {
    goal: getRandomItem(goals),
    person: '',
    people: [],
    goalModalVisible: false,
    personModalVisible: false
  };

  componentDidMount() {
    store.get('people').then(people => {
      if (people && people.length) {
        this.setState({
          people,
          person: getRandomItem(people)
        });
      }
    });
  }

  _save = () => {
    const { save } = this.props;
    const { goal, person } = this.state;
    save(goal, person);
  };

  _selectGoal = goal => {
    this.setState({ goal });
  };

  _selectPerson = person => {
    this.setState({ person });
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
        style={styles.modal}
      >
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
        <View style={styles.view}>
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
        <View>
          <Button onPress={this._save} title="Save" style={styles.button} />
          <Button onPress={close} title="Cancel" style={styles.button} />
        </View>
      </Modal>
    );
  }
}
