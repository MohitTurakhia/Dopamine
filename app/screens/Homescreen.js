import React from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  Slider,
  TouchableOpacity,
  ToastAndroid,
  Animated
} from 'react-native';
import { Header, Left, Title, Body, Right, Button, Container, Icon} from 'native-base';
import Sound from 'react-native-sound';
//import WaveForm from 'react-native-audiowaveform';
//import Audio from 'react-native-audio';
import {Actions} from 'react-native-router-flux';
//import MarqueeText from 'react-native-marquee';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


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
      radiovalue: 0,
      isPressed:false,
      animated: new Animated.Value(0),
      opacityA: new Animated.Value(1)
    };
  }

  componentDidMount() {
  song = new Sound('demobeat.mp3', Sound.MAIN_BUNDLE, (error) => {
      if(error)
        ToastAndroid.show('Error when init Sound ',ToastAndroid.SHORT);
    });
  }

  onPressButtonPlay = () => {
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
      song.setSpeed(this.state.slideValue)
      if(!this.state.pause){ //play resume
        
        song.play((success) => {
          song.setSpeed(this.state.slideValue)
          if(!success)
            ToastAndroid.show('Error when play Sound ',ToastAndroid.SHORT);
        })
      }
      else song.pause();
       
      this.setState({pause: !this.state.pause});      
    }
  }

  _runAnimation() {
    const { animated, opacityA } = this.state;
    Animated.loop(
        Animated.parallel([
            Animated.timing(animated, {
                toValue: 1,
                duration: 1000/this.state.slideValue,
            }),
            Animated.timing(opacityA, {
                toValue: 0,
                duration: 1000/this.state.slideValue,
            })
        ])
    ).start();
}
  
  _stopAnimation() {
    Animated.loop(
        Animated.parallel([
            Animated.timing(animated),
            Animated.timing(opacityA)
        ])
    ).stop();
  }

  _onPress = () => {
    if(!this.state.isPressed){
      this.setState({ isPressed: !this.state.isPressed });
    }else{
      this.setState(
          state => ({ isPressed: !state.isPressed })
      )
    }
  }

  

  _micButton() {
    const { isPressed,animated,opacityA} = this.state;
    if (isPressed) {
        //some function
        this._runAnimation();
        return (
            <Animated.View style={{
                marginVertical:15,
                width: 250,
                height: 250,
                borderRadius: 125,
                backgroundColor: 'rgba(255, 34, 17,0.4)',
                opacity: opacityA,
                transform: [
                    {
                        scale: animated
                    }
                ]
            }}>
                {/* icon or image */}
            </Animated.View>
        );
    } else {
        return (
            <View style={{
                marginVertical: 15,
                width: 250,
                height: 250,
                borderRadius: 125,
                backgroundColor: 'rgba(153,0,0,0.4)',
            }}>
                {/* icon or image */}
            </View>
        );
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
    const gotopage = () => Actions.recorderscreen1({beat: this.state.slideValue})
    var radio_props = [
      {label: 'Piano', value: 0},
      {label: 'Guitar', value: 1}
    ];

    return(
      <View style={styles.container}>  
        <Text style={styles.text}>Beat Speed Selector: </Text>     
        <Slider style={styles.slider} 
          
          minimumValue={0}
          maximumValue={2}
          value={this.state.slideValue}
          onValueChange={(value)=> this.setState({ slideValue: value}) }
          maximumTrackTintColor='#fff'  
          minimumTrackTintColor='#fff'
          step={0.25}
          />

        <Text style={styles.text}>Selected Beat Speed: {this.state.slideValue}</Text>
        <View style={{marginTop:20}}>
        {/* <TouchableOpacity onPress={() => {this.onPressButtonPlay(); this._onPress();}} style={styles.button}>
    <Text style={styles.buttontext}>{this.state.pause ? 'Play Beat' : 'Pause Beat'}</Text>
        </TouchableOpacity> */}
        
        <RadioForm
          radio_props={radio_props}
          initial={0}
          onPress={(value) => {this.setState({ radiovalue: value})}}
          formHorizontal={true}
          labelHorizontal={true}
          buttonColor={'#fff'}
          selectedButtonColor={'#fff'}
          animation={true}
          labelStyle={{color: '#fff', fontSize: 20, paddingRight: 20}}
        />
        
        <TouchableOpacity onPress={() => {this.onPressButtonPause(); this._onPress();} } style={styles.button}>
          <Text style={styles.buttontext}>{this.state.pause ? 'Pause Beat' : 'Play Beat'}</Text>
        </TouchableOpacity>
        </View>

        {this._micButton()}

        <TouchableOpacity style={styles.button} onPress={gotopage}>
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
    alignItems: 'center',
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