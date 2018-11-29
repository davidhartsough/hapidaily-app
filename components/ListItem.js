import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#fff',
    padding: 8
  },
  text: {
    fontSize: 14
  }
});

export default class ListItem extends React.PureComponent {
  _onPress = () => {
    const { onPressItem, id } = this.props;
    onPressItem(id);
  };

  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.listItem}>
          <Text style={styles.text}>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
