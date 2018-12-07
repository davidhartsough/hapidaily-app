import React from 'react';
import SearchableList from '../../components/SearchableList';
import ImpactListItem from './ImpactListItem';

const impactsSort = (a, b) => b.date - a.date;

export default class ImpactsScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Impacts'
  };

  _filter = (data, si) => data.filter(item => item.impact.toUpperCase().includes(si.toUpperCase()));

  _keyExtractor = (item, index) => `${item.date}-${index}`;

  _renderItem = ({ item }) => <ImpactListItem impact={item.impact} date={item.date} />;

  render() {
    const { impacts } = this.props;
    return (
      <SearchableList
        data={impacts.sort(impactsSort)}
        dataFilter={this._filter}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        emptyStateText="Here you'll see a list of your completed goals, but it looks like you haven't completed any just yet. (That's okay. I know you will soon!)"
      />
    );
  }
}
