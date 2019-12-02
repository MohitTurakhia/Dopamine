import React from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  Dimensions,
  Slider,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import { Header, Left, Title, Body, Right, Button, Container, Icon} from 'native-base';
import Sound from 'react-native-sound';
import WaveForm from 'react-native-audiowaveform';
import Audio from 'react-native-audio';
import {Actions} from 'react-native-router-flux';
import MarqueeText from 'react-native-marquee';


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

var song = null; 
var audioEle = null; 
class CustomSlider extends React.Component{
  
  constructor(props) {
    super(props)

    this.state = {
      slideValue: 1,
      pause: false,

    };
  }

  componentWillMount() {
  // audioEle = new Audio('./audio/demobeat.mp3')
  song = new Sound('demobeat.mp3', Sound.MAIN_BUNDLE, (error) => {
      if(error)
        ToastAndroid.show('Error when init Sound ',ToastAndroid.SHORT);
    });
  }

  onPressButtonPlay() {
    // song = new Sound('demobeat.mp3', Sound.MAIN_BUNDLE, (error) => {
    //   if(error)
    //     ToastAndroid.show('Error when init Sound ',ToastAndroid.SHORT);
    //   else {
    //     song.play((success) => {
    //       if(!success)
    //         ToastAndroid.show('Error when play Sound ',ToastAndroid.SHORT);
    //     });
    //   }
    // });
    
    if(song != null) {
      song.setSpeed(this.state.slideValue)
      song.play((success) => {
        if(!success)
          ToastAndroid.show('Error when play Sound ',ToastAndroid.SHORT);
      });
    }
  }

  onPressButtonPause = () =>{
    if(song != null) {
      if(this.state.pause) //play resume
        song.play((success) => {
          if(!success)
            ToastAndroid.show('Error when play Sound ',ToastAndroid.SHORT);
        })
      else song.pause();
       
      this.setState({pause: !this.state.pause});      
    }
  }

  // onPressButtonPlay = () =>{
  //   var whoosh = new Sound('demobeat.mp3', Sound.MAIN_BUNDLE, (error) => {
  //     if (error) {
  //       console.log('failed to load the sound', error);
  //       return;
  //     }
  //     // loaded successfully
  //     console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
     
  //     // Play the sound with an onEnd callback
  //     whoosh.play((success) => {
  //       if (success) {
  //         console.log('successfully finished playing');
  //       } else {
  //         console.log('playback failed due to audio decoding errors');
  //       }
  //     });
  //   });
  //   console.log("Hello Mohit");

  // }

  
  render(){
    
    return(
      <View style={styles.container}>  
        <Text style={styles.text}>Beat Speed Selector: </Text>     
        <Slider style={styles.slider} 
          
          minimumValue={1}
          maximumValue={6}
          value={this.state.slideValue}
          onValueChange={(value)=> this.setState({ slideValue: value}) }
          maximumTrackTintColor='#fff'  
          minimumTrackTintColor='#fff'
          step={1}
          />

        <Text style={styles.text}>Selected Beat Speed: {this.state.slideValue}</Text>
        <View style={{flexDirection: 'row', marginTop:10}}>
        <TouchableOpacity onPress={this.onPressButtonPlay.bind(this)} style={styles.button}>
        <Text style={styles.buttontext}>Play Beat</Text>
        </TouchableOpacity>
 
        <TouchableOpacity onPress={this.onPressButtonPause.bind(this)} style={styles.button}>
          <Text style={styles.buttontext}>{this.state.pause ? 'Resume Beat' : 'Pause Beat'}</Text>
        </TouchableOpacity>
        </View>
        <MarqueeText
          // style={{ fontSize: 24 }}
          duration={150/this.state.slideValue}
          marqueeOnStart={this.state.pause}
          loop
          marqueeDelay={0}
          marqueeResetDelay={0}
        >
        <Image 
         source={require("./wave.png")}
        />
        </MarqueeText>

         
        {/* <WaveForm
          source={{uri:'./audio/demobeat.mp3'}}
          waveFormStyle={{waveColor:'red', scrubColor:'white'}}
        ></WaveForm>  */}

        

        <TouchableOpacity style={styles.button} onPress={Actions.recordscreen}>
        <Text style={styles.buttontext}>Record Your Song</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider:{
    width:350,
    height: 50
  },
  button: {
    margin: 10,
    borderRadius: 300,
    padding:20,
    backgroundColor:'#fff',
  },
  buttontext: {
    color:'#1b1c1b',
    fontSize: 18,
    fontWeight: '900',
    fontFamily: 'Serif'
  },
  text:{
    fontSize: 20,
    color: '#fff'
  }
})