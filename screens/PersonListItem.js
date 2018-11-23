import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#fff',
  },
});

export default class PersonListItem extends React.PureComponent {
  _onPress = () => {
    const { onPressItem, index } = this.props;
    onPressItem(index);
  };

  render() {
    const { name } = this.props;
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.listItem}>
          <Text>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
