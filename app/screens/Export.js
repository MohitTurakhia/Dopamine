import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, Text, View, TouchableOpacity, LayoutAnimation, Image, ScrollView, Animated } from 'react-native';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';
import {Actions} from 'react-native-router-flux';
//import AudioRecorder from 'react-native-audio';
import { Header, Left, Title, Body, Icon, Button} from 'native-base';

export default class Export extends Component {

  render() {
    return (
      <View>
        <Header style={{backgroundColor:"#1b1c1b"}}>
          <StatusBar backgroundColor="#1b1c1b" barStyle="light-content" />
            <Left> 
                <Button transparent>
                <Icon name="menu" onPress={()=>this.props.navigation.openDrawer()}/>
                </Button>
            </Left>
            <Body>
                <Title>DopaMINE</Title>
            </Body>
          </Header>
          <View style={styles.container}>
            <View style={{flexDirection:'row'}}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttontext}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttontext}>Pause</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttontext}>Stop</Text>
          </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center',}}>
              <Text style={styles.text}>XX : XX</Text>
              <Text style={styles.text}>BEAT RATE: X</Text>
            </View>
            <Image 
         source={require("./wave.png")}
        />
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={styles.button} onPress={Actions.recordscreen}>
            <Text style={styles.buttontext}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={Actions.importsong}>
            <Text style={styles.buttontext}>Confirm</Text>
          </TouchableOpacity>
            </View>
          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#1b1c1b',
    height:700,
  },
  button: {
    margin: 10,
    marginTop: 50,
    borderRadius: 30,
    padding: 20,
    paddingHorizontal: 50,
    backgroundColor: '#fff',
  },
  text: {
    color: '#fff',
    fontFamily: 'Serif',
    fontSize: 25,
  },
  buttontext: {
    color: '#1b1c1b',
    fontSize: 18,
    fontWeight: '900',
    fontFamily: 'Serif',
  },
});