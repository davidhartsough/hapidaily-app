import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import Colors from '../../constants/Colors';
import ListItem from '../../components/ListItem';
import PersonModal from './PersonModal';
import { createPerson, updatePerson, deletePerson } from '../../store/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    paddingBottom: 64
  },
  searchBarContainer: {
    backgroundColor: '#F5F5F5'
  },
  input: {
    backgroundColor: '#eee',
    paddingLeft: 28
  },
  noResultsText: {
    padding: 16,
    fontSize: 14
  }
});

class PeopleScreen extends React.Component {
  static navigationOptions = {
    title: 'People'
  };

  constructor(props) {
    super(props);
    this.state = {
      editModalVisible: false,
      addModalVisible: false,
      selectedPersonName: '',
      searchInput: ''
    };
    this.selectedPersonIndex = 0;
  }

  _onChangeText = searchInput => this.setState({ searchInput });

  _onClearText = () => this.setState({ searchInput: '' });

  _filter = data => data.filter(item => {
    const { searchInput } = this.state;
    return item.toUpperCase().includes(searchInput.toUpperCase());
  });

  _closeEditModal = () => {
    this.setState({ editModalVisible: false });
  };

  _delete = () => {
    this.props.deletePerson(this.selectedPersonIndex);
    this.setState({ editModalVisible: false });
  };

  _save = name => {
    this.props.updatePerson(this.selectedPersonIndex, name);
    this.setState({ editModalVisible: false });
  };

  _keyExtractor = (item, index) => item + index;

  _onPressItem = index => {
    const { people } = this.props;
    const person = this._filter(people)[index];
    this.selectedPersonIndex = people.findIndex(name => name === person);
    this.setState({
      editModalVisible: true,
      selectedPersonName: people[this.selectedPersonIndex]
    });
  };

  _renderItem = ({ item, index }) => (
    <ListItem id={index} item={item} onPressItem={this._onPressItem} />
  );

  _openAddPersonModal = () => {
    this.setState({ addModalVisible: true });
  };

  _closeAddPersonModal = () => {
    this.setState({ addModalVisible: false });
  };

  _addNewPerson = name => {
    this.props.createPerson(name);
    this.setState({ addModalVisible: false });
  };

  render() {
    const { people } = this.props;
    const { addModalVisible, editModalVisible, selectedPersonName, searchInput } = this.state;
    return (
      <View style={styles.container}>
        <PersonModal
          visible={addModalVisible}
          save={this._addNewPerson}
          close={this._closeAddPersonModal}
          name=""
          title="Add Person"
          deletePerson={false}
        />
        <PersonModal
          visible={editModalVisible}
          save={this._save}
          close={this._closeEditModal}
          name={selectedPersonName}
          title="Edit Person"
          deletePerson={this._delete}
        />
        {people.length ? (
          <FlatList
            data={this._filter(people)}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            ListEmptyComponent={
              <Text style={styles.noResultsText}>{`No results for "${searchInput}".`}</Text>
            }
            ListHeaderComponent={(
              <SearchBar
                icon={{ type: 'material', color: 'rgba(0, 0, 0, 0.5)', name: 'search' }}
                clearIcon={{
                  name: 'clear',
                  color: 'rgba(0, 0, 0, 0.5)',
                  style: { paddingRight: 8, paddingLeft: 8 }
                }}
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                lightTheme
                onChangeText={this._onChangeText}
                onClearText={this._onClearText}
                value={searchInput}
                placeholder="Search"
                returnKeyType="search"
                containerStyle={styles.searchBarContainer}
                inputStyle={styles.input}
                round
              />
)}
            contentContainerStyle={styles.contentContainer}
          />
        ) : (
          <Text>Empty...</Text>
        )}
        <ActionButton
          buttonColor={Colors.primaryRGBA}
          onPress={this._openAddPersonModal}
          position="center"
        />
      </View>
    );
  }
}

const mapStateToProps = ({ people }) => ({ people });
const mapDispatchToProps = { createPerson, updatePerson, deletePerson };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PeopleScreen);
