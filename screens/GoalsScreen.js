import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import store from 'react-native-simple-store';
import Colors from '../constants/Colors';
import GoalCard from './GoalCard';

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
    goals: []
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

  _complete = () => {
    // const impact = {
    //   goal: '',
    //   date: Date.now(),
    // };
  };

  _renderGoal = (item, index) => (
    <GoalCard
      key={item.goal + item.person + index}
      index={index}
      endGoal={getEndGoal(item)}
      complete={this._complete}
      edit={this._edit}
    />
  );

  // _create = () => {
  //   const {
  //     navigation: { navigate }
  //   } = this.props;
  //   navigate('CreateGoal');
  // };

  _openAddGoalModal = () => {};

  render() {
    const { goals } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {goals.map(this._renderGoal)}
        </ScrollView>
        {goals.length < 3 && (
          <ActionButton
            buttonColor={Colors.primaryRGBA}
            onPress={this._openAddGoalModal}
            position="center"
          />
        )}
      </View>
    );
  }
}
