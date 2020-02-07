import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, Text, TextInput, Slider, View, TouchableOpacity, LayoutAnimation, Image, ScrollView, Animated } from 'react-native';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';
import {Actions} from 'react-native-router-flux';
//import AudioRecorder from 'react-native-audio';
import { Header, Left, Title, Body, Icon, Button} from 'native-base';

export default class Import extends Component {

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
          <TouchableOpacity style={
              {
                margin: 10,
                marginTop: 50,
                borderRadius: 30,
                padding: 20,
                paddingHorizontal: 20,
                backgroundColor: '#fff',
              }
          }>
            <Text style={styles.buttontext}>Play</Text>
          </TouchableOpacity>
          <Slider style={styles.slider} 
          
          minimumValue={1}
          maximumValue={6}
        //   value={this.state.slideValue}
        //   onValueChange={(value)=> this.setState({ slideValue: value}) }
          maximumTrackTintColor='#fff'  
          minimumTrackTintColor='#fff'
          step={1}
          />
            </View>
            <View style={{alignItems: 'center',}}>
            <TouchableOpacity style={styles.button} onPress={Actions.homepage}>
            <Text style={styles.buttontext}>Re-edit</Text>
          </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',marginTop:40}}>
          <View >
            <Image 
            style={{height:150,width:150,backgroundColor:'#fff'}}
            source={require("./album.png")}
            />
          </View> 
          <View style={{marginLeft:10}}>
          <TextInput 
            style={styles.inputBox}
            underlineColorAndroid='#fff'
            placeholder='Album Name'
            placeholderTextColor='#fff'
            />
            <TextInput 
            style={styles.inputBox}
            underlineColorAndroid='#fff'
            placeholder='Artist Name'
            placeholderTextColor='#fff'
            />
            <TextInput 
            style={styles.inputBox}
            underlineColorAndroid='#fff'
            placeholder='Genre'
            placeholderTextColor='#fff'
            />
            </View>
          </View>



            <View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttontext}>Export</Text>
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
  slider: {
    top: 60,
    width:300,
    height: 50
  },
  inputBox: {
    // width: 300,
    backgroundColor: '#1b1c1b',
   paddingHorizontal: 16,
    // borderRadius: 25,
    fontSize:16,
    color: '#fff',
    // marginVertical: 10,
  }
});