import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, Text, View, TouchableOpacity, LayoutAnimation, Image, ScrollView, Animated } from 'react-native';
import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';
import {Actions} from 'react-native-router-flux';
//import AudioRecorder from 'react-native-audio';
import { Header, Left, Title, Body, Right, Container, Icon, Button} from 'native-base';

export default class Recorderscreen extends Component {

  sound = null;
  state = {
    audioFile: '',
    loaded: false,
    paused: true,
    isPressed:false,
    animated: new Animated.Value(0),
    opacityA: new Animated.Value(1)
  };
   constructor(props) {
        super(props);
        this._onPress = this._onPress.bind(this);
    }
  _runAnimation() {
        const { animated, opacityA } = this.state;
        Animated.loop(
            Animated.parallel([
                Animated.timing(animated, {
                    toValue: 1,
                    duration: 1000,
                }),
                Animated.timing(opacityA, {
                    toValue: 0,
                    duration: 1000,
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
     _onPress() {
      if(!this.state.isPressed){
        this.setState({ isPressed: !this.state.isPressed, audioFile: '', recording: true, loaded: false });
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
            this.startrec();
            this._runAnimation();
            return (
                <Animated.View style={{
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
           this.stoprec();
            return (
                <View style={{
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
   componentDidMount() {
    // await this.checkPermission();
    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: 'test.wav'
    };

    AudioRecord.init(options);
    AudioRecord.on('data', data => {
      const chunk = Buffer.from(data, 'base64');
      console.log('chunk size', chunk.byteLength);
      // do something with audio chunk
    });
  }
  
  // checkPermission = async () => {
  //   const p = await Permissions.check('microphone');
  //   console.log('permission check', p);
  //   if (p === 'authorized') return;
  //   return this.requestPermission();
  // };

  // requestPermission = async () => {
  //   const p = await Permissions.request('microphone');
  //   console.log('permission request', p);
  // };

  startrec = () => {
    console.log('start record');
    //this.setState({ audioFile: '', recording: true, loaded: false });
    AudioRecord.start();
  };

  stoprec = async () => {
    if (!this.state.recording) return;
    console.log('stop record');
    let audioFile = await AudioRecord.stop();
    console.log('audioFile', audioFile);
    this.setState({ audioFile });
  };

  load = () => {
    return new Promise((resolve, reject) => {
      if (!this.state.audioFile) {
        return reject('file path is empty');
      }

      this.sound = new Sound(this.state.audioFile, '', error => {
        if (error) {
          console.log('failed to load the file', error);
          return reject(error);
        }
        this.setState({ loaded: true });
        return resolve();
      });
    });
  };

  play = async () => {
     if (!this.state.loaded) {
      try {
        await this.load();
      } catch (error) {
        console.log(error);
      }
    }

    this.setState({ paused: false });
    Sound.setCategory('Playback');
    this.sound.setSpeed(1);
    this.sound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
      this.setState({ paused: true,loaded: false });
      this.sound.release();
    });
  };

  pause = () => {
    this.sound.pause();
    this.setState({ paused: true });
  };

  render() {
    const { paused, audioFile } = this.state;
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
            <TouchableOpacity onPress={this._onPress}>
                    {this._micButton()}
            </TouchableOpacity>
          <View style={{flexDirection:'row',marginTop:35}}>
          {paused ? (
            <TouchableOpacity onPress={this.play} disabled={!audioFile} style={styles.button}><Text style={styles.buttontext}>Play</Text></TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={this.pause} disabled={!audioFile} style={styles.button}><Text style={styles.buttontext}>Pause</Text></TouchableOpacity>
          )}

          <TouchableOpacity onPress={Actions.homepage} style={styles.button}><Text style={styles.buttontext}>Back</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#1b1c1b',
    height: 700,
  },
  button: {
    margin: 10,
    marginTop: 50,
    borderRadius: 30,
    padding:20,
    paddingHorizontal: 50,
    backgroundColor:'#fff',
  },
  buttontext: {
    color:'#1b1c1b',
    fontSize: 18,
    fontWeight: '900',
    fontFamily: 'Serif'
  },
});