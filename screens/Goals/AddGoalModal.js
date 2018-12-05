import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import GoalList from '../../constants/goals';
import Colors from '../../constants/Colors';
import SelectModal from '../../components/SelectModal';

const shuffleArray = array => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const goals = shuffleArray(GoalList);

const getRandomItem = array => array[Math.floor(Math.random() * array.length)];

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 16,
    paddingTop: 0
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    marginTop: 16
  },
  select: {
    fontSize: 16,
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 2
  },
  actions: {
    marginTop: 24,
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

export default class AddGoalModal extends React.Component {
  state = {
    goal: getRandomItem(goals),
    person: 'someone',
    goalModalVisible: false,
    personModalVisible: false
  };

  componentDidMount() {
    this._loadModal();
  }

  _loadModal = () => {
    const { people } = this.props;
    this.setState({
      goal: getRandomItem(goals),
      person: people.length ? getRandomItem(people) : 'someone'
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
    const { visible, close, people } = this.props;
    const { goal, person, goalModalVisible, personModalVisible } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={close}
        onShow={this._loadModal}
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
            <View style={styles.buttonViewLeft}>
              <Button
                onPress={this._save}
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
            <View style={styles.buttonViewRight}>
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
