import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import store from 'react-native-simple-store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

const getDate = milliseconds => new Date(milliseconds).toLocaleDateString();

const ListItem = ({ impact, date }) => (
  <View>
    <Text>{impact}</Text>
    <Text>{getDate(date)}</Text>
  </View>
);

export default class ImpactsScreen extends React.Component {
  static navigationOptions = {
    title: 'Impacts'
  };

  state = { impacts: [] };

  componentDidMount() {
    store.get('impacts').then(impacts => {
      if (impacts && impacts.length) {
        this.setState({ impacts });
      }
    });
  }

  _keyExtractor = (item, index) => item.date + index;

  _renderItem = ({ item }) => <ListItem impact={item.impact} date={item.date} />;

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
