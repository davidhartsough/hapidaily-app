import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 8,
    padding: 12,
    boxShadow:
      '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)'
  },
  text: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 8
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
        <Text style={styles.text}>{endGoal}</Text>
        <View style={styles.actions}>
          <View style={styles.button}>
            <Button onPress={this._complete} title="Mark as done" />
          </View>
          <View style={styles.button}>
            <Button onPress={this._edit} title="Edit" />
          </View>
        </View>
      </View>
    );
  }
}
