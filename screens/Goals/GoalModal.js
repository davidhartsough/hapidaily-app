import React from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import ButtonGroup from '../../components/ButtonGroup';
import Selection from '../../components/Selection';

const shuffleArray = array => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 16,
    paddingTop: 4
  },
  selections: {
    paddingBottom: 24
  }
});

export default class GoalModal extends React.Component {
  state = {
    goal: '',
    person: '',
    goals: []
  };

  _updateState = () => {
    const { goal, person, goalList } = this.props;
    this.setState({
      goal,
      person,
      goals: shuffleArray(goalList)
    });
  };

  _save = () => {
    const { save, index } = this.props;
    const { goal, person } = this.state;
    save(index, goal, person);
  };

  _selectGoal = goal => {
    this.setState({ goal });
  };

  _selectPerson = person => {
    this.setState({ person });
  };

  render() {
    const { visible, close, people } = this.props;
    const { goal, person, goals } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={close}
        onShow={this._updateState}
      >
        <View style={styles.view}>
          <View style={styles.selections}>
            <Selection select={this._selectGoal} data={goals} name="goal" currentSelection={goal} />
            <Selection
              select={this._selectPerson}
              data={people}
              name="person"
              currentSelection={person}
            />
          </View>
          <ButtonGroup
            buttons={[
              { title: 'SAVE', onPress: this._save, type: 'primary' },
              { title: 'CANCEL', onPress: close, type: 'default' }
            ]}
          />
        </View>
      </Modal>
    );
  }
}
