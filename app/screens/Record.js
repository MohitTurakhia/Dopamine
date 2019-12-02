import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class Record extends React.Component {
  render() {
    return(
      <View style={styles.container}>
        <Text style={{color: 'red'}}>Record Screen Hello</Text>
        <Image 
         source={require("./wave.png")}
        /> 
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})