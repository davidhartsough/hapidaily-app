import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import Colors from '../../constants/Colors';
import GoalCard from './GoalCard';
import AddGoalModal from './AddGoalModal';
import { createGoal, updateGoal, deleteGoal, createImpact } from '../../store/actions';

const getEndGoal = item => item.goal.replace('someone', item.person);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
  }
});

class GoalsScreen extends React.Component {
  static navigationOptions = {
    title: 'Goals'
  };

  state = {
    addModalVisible: false
  };

  _complete = index => {
    const { goals } = this.props;
    this.props.createImpact(getEndGoal(goals[index]));
    this.props.deleteGoal(index);
  };

  _edit = index => {
    const { goals } = this.props;
    console.log(goals[index]);
  };

  _openAddModal = () => {
    this.setState({ addModalVisible: true });
  };

  _closeAddModal = () => {
    this.setState({ addModalVisible: false });
  };

  _addNewGoal = (goal, person) => {
    this.props.createGoal(goal, person);
    this.setState({ addModalVisible: false });
  };

  render() {
    const { goals, people } = this.props;
    const { addModalVisible } = this.state;
    return (
      <View style={styles.container}>
        <AddGoalModal
          people={people}
          visible={addModalVisible}
          save={this._addNewGoal}
          close={this._closeAddModal}
        />
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

const mapStateToProps = ({ goals, people }) => ({ goals, people });
const mapDispatchToProps = { createGoal, updateGoal, deleteGoal, createImpact };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoalsScreen);
