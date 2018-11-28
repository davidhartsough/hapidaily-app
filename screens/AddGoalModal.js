import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableHighlight, Button } from 'react-native';
import store from 'react-native-simple-store';
import Goals from '../constants/goals';
import SelectGoalModal from './SelectGoalModal';
import SelectPersonModal from './SelectPersonModal';

const getRandomItem = array => array[Math.floor(Math.random() * array.length)];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default class AddGoalModal extends React.Component {
  state = {
    goal: getRandomItem(Goals),
    person: '',
    people: [],
    goalModalVisible: false,
    personModalVisible: false
  };

  componentDidMount() {
    store.get('people').then(people => {
      if (people) {
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
        <SelectGoalModal
          visible={goalModalVisible}
          close={this._closeGoalSelect}
          select={this._selectGoal}
          goals={Goals}
        />
        <SelectPersonModal
          visible={personModalVisible}
          close={this._closePersonSelect}
          select={this._selectPerson}
          people={people}
        />
        <View>
          <Text>Choose a goal</Text>
          <TouchableHighlight onPress={this._openGoalSelect}>
            <Text>{goal}</Text>
          </TouchableHighlight>
        </View>
        <View>
          <Text>Choose a person</Text>
          <TouchableHighlight onPress={this._openPersonSelect}>
            <Text>{person}</Text>
          </TouchableHighlight>
        </View>
        <View>
          <Button onPress={this._save} title="Save" />
          <Button onPress={close} title="Cancel" />
        </View>
      </Modal>
    );
  }
}
