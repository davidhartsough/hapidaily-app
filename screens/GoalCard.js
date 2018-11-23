import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
  },
});

export default class GoalCard extends React.PureComponent {
  _complete = () => {
    const { complete, index } = this.props;
    complete(index);
  };

  _edit = () => {
    const { edit, index } = this.props;
    edit(index);
  };

  render() {
    const { endGoal } = this.props;
    return (
      <View style={styles.card}>
        <Text>{endGoal}</Text>
        <Button onPress={this._complete} title="Complete" />
        <Button onPress={this._edit} title="Edit" />
      </View>
    );
  }
}
