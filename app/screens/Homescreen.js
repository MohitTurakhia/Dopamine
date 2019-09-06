import React from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
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
                <Title>Dopamine</Title>
            </Body>
          </Header>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})