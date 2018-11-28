import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import store from 'react-native-simple-store';
import Colors from '../constants/Colors';
import GoalCard from './GoalCard';
import AddGoalModal from './AddGoalModal';

const getEndGoal = item => item.goal.replace('someone', item.person);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    // paddingTop: 30,
  }
});

export default class GoalsScreen extends React.Component {
  static navigationOptions = {
    title: 'Goals'
  };

  state = {
    goals: [],
    addModalVisible: false
  };

  componentDidMount() {
    this._fetchGoals();
  }

  _fetchGoals = () => {
    store.get('goals').then(goals => {
      if (goals) {
        this.setState({ goals });
      }
    });
  };

  _clearGoal = index => {
    this.setState(state => {
      const { goals } = state;
      goals.splice(index, 1);
      return {
        goals
      };
    }).then(state => {
      store.save('goals', state.goals);
    });
  };

  _complete = index => {
    const { goals } = this.state;
    const newImpact = {
      impact: getEndGoal(goals[index]),
      date: Date.now()
    };
    this._clearGoal(index);
    store.push('impacts', newImpact);
  };

  _edit = index => {
    const { goals } = this.state;
    console.log(goals[index]);
  };

  // _create = () => {
  //   const {
  //     navigation: { navigate }
  //   } = this.props;
  //   navigate('CreateGoal');
  // };

  _openAddModal = () => {
    this.setState({ addModalVisible: true });
  };

  _closeAddModal = () => {
    this.setState({ addModalVisible: false });
  };

  _addNewGoal = (goal, person) => {
    const newGoal = { goal, person };
    this.setState(state => {
      const { goals } = state;
      goals.push(newGoal);
      return {
        goals,
        addModalVisible: false
      };
    });
    store.push('goals', newGoal);
  };

  render() {
    const { goals, addModalVisible } = this.state;
    return (
      <View style={styles.container}>
        <AddGoalModal
          visible={addModalVisible}
          save={this._addNewGoal}
          close={this._closeAddModal}
        />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {goals.map((item, index) => (
            <GoalCard
              key={item.goal + item.person + index}
              index={index}
              endGoal={getEndGoal(item)}
              complete={this._complete}
              edit={this._edit}
            />
          ))}
        </ScrollView>
        {goals.length < 3 && (
          <ActionButton
            buttonColor={Colors.primaryRGBA}
            onPress={this._openAddModal}
            position="center"
          />
        )}
      </View>
    );
  }
}
