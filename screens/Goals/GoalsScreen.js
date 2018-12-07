import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card } from 'react-native-elements';
import Button from '../../components/Button';
import GoalCard from './GoalCard';
import GoalModal from './GoalModal';
import GoalList from '../../constants/goals';

const getRandomItem = array => array[Math.floor(Math.random() * array.length)];

const getEndGoal = item => item.goal.replace('someone', item.person);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
  },
  cardContainer: {
    borderWidth: 0,
    borderRadius: 2,
    padding: 16,
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16
  }
});

export default class GoalsScreen extends React.Component {
  static navigationOptions = {
    title: 'Goals'
  };

  state = {
    editModalVisible: false,
    selectedGoalIndex: 0
  };

  _complete = index => {
    const { goals, createImpact, deleteGoal } = this.props;
    createImpact(getEndGoal(goals[index]));
    deleteGoal(index);
  };

  _edit = index => {
    this.setState({
      editModalVisible: true,
      selectedGoalIndex: index
    });
  };

  _saveEdit = (index, goal, person) => {
    this.props.updateGoal(index, goal, person);
    this._closeEditModal();
  };

  _closeEditModal = () => {
    this.setState({ editModalVisible: false });
  };

  _createNewGoal = () => {
    const { people, createGoal } = this.props;
    const person = people.length ? getRandomItem(people) : 'someone';
    createGoal(getRandomItem(GoalList), person);
  };

  render() {
    const { goals, people } = this.props;
    const { editModalVisible, selectedGoalIndex } = this.state;
    return (
      <View style={styles.container}>
        {!!goals.length && !!goals[selectedGoalIndex] && (
          <GoalModal
            index={selectedGoalIndex}
            goal={goals[selectedGoalIndex].goal}
            person={goals[selectedGoalIndex].person}
            goalList={GoalList}
            people={people.length ? people.sort() : ['someone']}
            visible={editModalVisible}
            save={this._saveEdit}
            close={this._closeEditModal}
          />
        )}
        <ScrollView style={styles.container}>
          {goals.map((item, index) => (
            <GoalCard
              key={item.goal + item.person + index}
              index={index}
              endGoal={getEndGoal(item)}
              complete={this._complete}
              edit={this._edit}
            />
          ))}
          {goals.length < 3 && (
            <Card containerStyle={styles.cardContainer}>
              <Button onPress={this._createNewGoal} title="CREATE" type="primary" />
            </Card>
          )}
        </ScrollView>
      </View>
    );
  }
}
