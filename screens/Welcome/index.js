import React from 'react';
import { Contacts, Permissions } from 'expo';
import store from 'react-native-simple-store';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { importPeople } from '../../store/actions';
import AppNavigator from '../../navigation/AppNavigator';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  welcomeView: {
    padding: 24,
    paddingTop: 48,
    paddingRight: 24,
    paddingBottom: 24,
    paddingLeft: 24
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 16
  },
  text: {
    fontSize: 16,
    marginBottom: 8
  },
  bold: {
    fontWeight: 'bold'
  },
  smallcaps: {
    fontVariant: ['small-caps']
  },
  buttonView: {
    marginBottom: 4,
    marginTop: 12
  }
});

class WelcomeScreen extends React.Component {
  state = {
    isReady: false,
    hasLoaded: false
  };

  componentDidMount() {
    store.get('isReady').then(res => {
      const isReady = !!res;
      this.setState({
        isReady,
        hasLoaded: true
      });
    });
  }

  _import = () => {
    Contacts.getContactsAsync().then(({ data }) => {
      if (data.length) {
        const people = data.map(person => person.name);
        this.props.importPeople(people);
      }
      this._go();
    });
  };

  _requestImport = () => {
    Permissions.askAsync(Permissions.CONTACTS).then(({ status }) => {
      if (status === 'granted') {
        this._import();
      } else {
        this._go();
      }
    });
  };

  _go = () => {
    store.save('isReady', true).then(() => {
      this.setState({
        isReady: true
      });
    });
  };

  render() {
    const { isReady, hasLoaded } = this.state;
    if (!hasLoaded) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={Colors.tintColor} />
        </View>
      );
    }
    if (isReady) {
      return <AppNavigator />;
    }
    return (
      <View style={styles.welcomeView}>
        <View style={styles.header}>
          <Text style={styles.title}>
            H
            <Text style={styles.smallcaps}>api</Text>
            Daily
          </Text>
          <Text style={styles.subtitle}>have a positive impact daily</Text>
        </View>
        <Text style={styles.text}>
          Welcome! This app is all about setting goals to have positive impacts on the people in
          your life.
        </Text>
        <Text style={styles.text}>
          In order to include specific people in your goals, you will need to add them by name. To
          do this automatically, simply import your contacts.
        </Text>
        <View style={styles.buttonView}>
          <Button onPress={this._requestImport} title="IMPORT CONTACTS" type="primary" />
        </View>
        <View style={styles.buttonView}>
          <Button onPress={this._go} title="SKIP" type="default" />
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  { importPeople }
)(WelcomeScreen);
