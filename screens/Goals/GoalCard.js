import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-elements';
import ButtonGroup from '../../components/ButtonGroup';

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 0,
    borderRadius: 2,
    padding: 16,
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16
  },
  text: {
    fontSize: 16,
    marginBottom: 12
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
      <Card containerStyle={styles.cardContainer}>
        <Text style={styles.text}>{endGoal}</Text>
        <ButtonGroup
          buttons={[
            { title: 'MARK AS DONE', onPress: this._complete, type: 'primary' },
            { title: 'EDIT', onPress: this._edit, type: 'default' }
          ]}
        />
      </Card>
    );
  }
}
