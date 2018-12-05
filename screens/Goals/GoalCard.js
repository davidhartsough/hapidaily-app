import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card } from 'react-native-elements';
import Colors from '../../constants/Colors';

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
  },
  actions: {
    flex: 1,
    flexDirection: 'row'
  },
  buttonViewLeft: {
    flex: 1,
    marginRight: 8,
    marginBottom: 2
  },
  buttonViewRight: {
    flex: 1,
    marginLeft: 8,
    marginBottom: 2
  },
  buttonContainer: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  button: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  buttonText: {
    letterSpacing: 0.5
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
        <View style={styles.actions}>
          <View style={styles.buttonViewLeft}>
            <Button
              onPress={this._complete}
              title="MARK AS DONE"
              backgroundColor={Colors.tintColor}
              borderRadius={2}
              buttonStyle={styles.button}
              containerViewStyle={styles.buttonContainer}
              fontSize={14}
              fontWeight="500"
              textStyle={styles.buttonText}
            />
          </View>
          <View style={styles.buttonViewRight}>
            <Button
              onPress={this._edit}
              title="EDIT"
              backgroundColor="#e0e0e0"
              color="rgba(0, 0, 0, 0.87)"
              borderRadius={2}
              buttonStyle={styles.button}
              containerViewStyle={styles.buttonContainer}
              fontSize={14}
              fontWeight="500"
              textStyle={styles.buttonText}
            />
          </View>
        </View>
      </Card>
    );
  }
}
