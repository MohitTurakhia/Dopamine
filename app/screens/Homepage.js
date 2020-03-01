import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import {createDrawerNavigator, DrawerItems} from 'react-navigation';
import Homescreen from './Homescreen';
import About from './About';



const { width } = Dimensions.get('window');
const { height } = Dimensions.get('screen');
export default class Homepage extends React.Component {
  render() {
    return(
      <AppDrawerNavigator />
    );
  }
}

// const CustomDrawerComponent = (props) => (
//   <SafeAreaView style={{flex:1}}>
//     <View style={{height:150, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
//       <Image source={require("./")} style={{}}/>
//     </View>
//     <ScrollView>
//       <DrawerItems{...props}/>
//     </ScrollView>
//   </SafeAreaView>
// )


const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: Homescreen,
    About: About
  },
  {
//   contentComponent: CustomDrawerComponent
    drawerWidth: width/1.5,
    contentOptions: {
      activeBackgroundColor: "#fff",
      activeTintColor:"#1b1c1b",
      inactiveBackgroundColor: "#1b1c1b",
      inactiveTintColor:"#fff",
      itemsContainerStyle: {
        backgroundColor: "#1b1c1b",
        height: height,
      }
    },
  }
  
)

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#1b1c1b',
//     },
// })