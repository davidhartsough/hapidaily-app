import React from 'react';
import SearchableList from './SearchableList';
import ListItem from './ListItem';

export default class List extends React.PureComponent {
  _filter = (data, si) => data.filter(item => item.toUpperCase().includes(si.toUpperCase()));

  _keyExtractor = (item, index) => `${item}-${index}`;

  _renderItem = ({ item }) => <ListItem item={item} onPressItem={this.props.onPressItem} />;

  render() {
    const { data, emptyStateText } = this.props;
    return (
      <SearchableList
        data={data}
        dataFilter={this._filter}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        emptyStateText={emptyStateText}
      />
    );
  }
}
