import React from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
} from 'react-native';
import { Header, Left, Title, Body, Right, Button, Container, Icon} from 'native-base';

export default class About extends React.Component {
  
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
      <View style={{alignContent:'center',flex:1,alignItems:'center'}}>
        <Text style={styles.text}>DopaMINE</Text>
        <Text style={styles.text}>This is a music generation app.</Text>
      </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  text:{
    color:'#fff',
    fontSize: 30
  },
})