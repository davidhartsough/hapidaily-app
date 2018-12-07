import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Font, Icon } from 'expo';
import DataProvider from './store';
import Welcome from './screens/Welcome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default class App extends React.Component {
  state = { isLoadingComplete: false };

  _loadResourcesAsync = async () => Promise.all([
    Font.loadAsync({
      ...Icon.Ionicons.font
    })
  ]);

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const { skipLoadingScreen } = this.props;
    const { isLoadingComplete } = this.state;
    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    return (
      <DataProvider>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <Welcome />
        </View>
      </DataProvider>
    );
  }
}
