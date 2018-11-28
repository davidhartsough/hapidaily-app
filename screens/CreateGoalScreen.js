import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Button } from 'react-native';
// import store from 'react-native-simple-store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default class AddGoalModal extends React.Component {
  state = {
    goal: 'Bake for someone',
    person: 'Jimmy James'
  };

  _save = () => {
    //
  };

  render() {
    const { goal, person } = this.state;
    return (
      <View style={styles.container}>
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
        </View>
      </View>
    );
  }
}
