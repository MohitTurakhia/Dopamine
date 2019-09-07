import React from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  Dimensions,
  Slider,
} from 'react-native';
import { Header, Left, Title, Body, Right, Button, Container, Icon} from 'native-base';
import {Sound} from 'react-native-sound';


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

      </View>
    );
  }
}

const styles = StyleSheet.create({
  
})