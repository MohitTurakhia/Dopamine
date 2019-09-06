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
    const width = Dimensions.get('window').width;
        
    const sliderStyle = {
            sliderDummy: {
                backgroundColor: '#d3d3d3',
                width: 300,
                height:30,
                borderRadius: 50,
                position: 'absolute',                
            },
            sliderReal: {
                backgroundColor: '#119EC2',
                width: (this.state.slideValue/50) * 300,
                height:30,
            }
        }

    return(
      <View style={{borderRadius: 50, overflow: 'hidden'}}>       
        <View style={{flexDirection: 'row', position: 'absolute'}}>
          <View style={sliderStyle.sliderDummy}></View>
            <View style={sliderStyle.sliderReal}></View>
        </View>
        <Slider 
          style={{width: 300, height: 30, borderRadius: 50}}
          minimumValue={0}
          maximumValue={50}
          value={this.state.slideValue}
          onValueChange={(value)=> this.setState({ slideValue: value}) }
          maximumTrackTintColor='transparent'  
          minimumTrackTintColor='transparent'
          />  
  
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})