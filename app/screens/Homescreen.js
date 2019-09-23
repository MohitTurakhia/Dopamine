import React from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  Dimensions,
  Slider,
  TouchableOpacity,
} from 'react-native';
import { Header, Left, Title, Body, Right, Button, Container, Icon} from 'native-base';
import Sound from 'react-native-sound';

export default class Homescreen extends React.Component {
  render() {
    return(
      <View style={{backgroundColor:"#1b1c1b",flex:1}}>
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
          <CustomSlider/>
      </View>
    );
  }
}

class CustomSlider extends React.Component{
  
  state={
    slideValue: 0,
  }

  playbeat = () =>{
    var whoosh = new Sound('demobeat.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
     
      // Play the sound with an onEnd callback
      whoosh.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
    console.log("Hello Mohit");

  }
  
  render(){
    return(
      <View>       
        <Slider 
          style={{alignContent:'center',justifyContent:'center'}}
          minimumValue={-3}
          maximumValue={3}
          value={this.state.slideValue}
          onValueChange={(value)=> this.setState({ slideValue: value}) }
          maximumTrackTintColor='#fff'  
          minimumTrackTintColor='#fff'
          />  
        <Text style={{color:"#fff", fontSize:50}}>{this.state.slideValue}</Text>
        <TouchableOpacity onPress={this.playbeat}>
        <Text style={{color:"#fff"}}>PlayBeat</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
})