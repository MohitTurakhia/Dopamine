import React, {Component} from 'react';
import {
  StatusBar, 
  StyleSheet, 
  Text, 
  View } 
  from 'react-native';

import Routes from './app/screens/Routes';

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor='#1b1c1b'
          barStyle='light-content'
        />
        <Routes/>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b1c1b',
    flex: 1,
    justifyContent: 'center',
  },
  
});
