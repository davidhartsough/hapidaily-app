import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import store from 'react-native-simple-store';

const getDate = milliseconds => {
  const date = new Date(milliseconds);
  return date.toLocaleDateString();
};

const ListItem = ({ goal, date }) => (
  <View>
    <Text>{goal}</Text>
    <Text>{getDate(date)}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default class ImpactsScreen extends React.Component {
  static navigationOptions = {
    title: 'Impacts'
  };

  state = { impacts: [] };

  componentDidMount() {
    store.get('impacts').then(impacts => {
      if (impacts) {
        this.setState({ impacts });
      }
    });
  }

  _keyExtractor = (item, index) => item.date + index;

  _renderItem = ({ item }) => <ListItem goal={item.goal} date={item.date} />;

  render() {
    const { impacts } = this.state;
    if (!impacts.length) {
      return (
        <View style={styles.container}>
          <Text>Got nothing yet mate</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList data={impacts} renderItem={this._renderItem} keyExtractor={this._keyExtractor} />
      </View>
    );
  }
}
