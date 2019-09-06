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
import Homescreen from './app/screens/Homescreen';
import Settingscreen from './app/screens/Settingscreen';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('screen');
export default class App extends React.Component {
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
    Settings: Settingscreen
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
