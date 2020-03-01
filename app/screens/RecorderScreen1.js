import React, { Component } from 'react';
import {  StatusBar, StyleSheet,
     Text, View, TouchableOpacity,
     PermissionsAndroid, Platform, Slider,
       Animated, Dimensions, } from 'react-native';
//import Modal from 'react-native-modal';
import {Actions} from 'react-native-router-flux';
//import AudioRecorder from 'react-native-audio';
import { Header, Left, Title,
     Body, Icon, Button} from 'native-base';
import AudioRecorderPlayer, {
        AVEncoderAudioQualityIOSType,
        AVEncodingOption,
        AudioEncoderAndroidType,
        AudioSet,
        AudioSourceAndroidType,
      } from 'react-native-audio-recorder-player';
import Sound from 'react-native-sound';

var song = null;
export default class RecorderScreen1 extends Component {
 
    //audioRecorderPlayer: AudioRecorderPlayer;
    constructor(props){
        super(props);
        this.state = {
            recordSecs: 0,
            recordTime: '00:00:00',
            currentPositionSec: 0,
            currentDurationSec: 0,
            playTime: '00:00:00',
            duration: '00:00:00',
            isPressed:false,
            animated: new Animated.Value(0),
            opacityA: new Animated.Value(1),
            playState: 'paused',
            //modalshow: false
        };
        // this.sliderEditing = false;
        this._onPress = this._onPress.bind(this);
        this.audioRecorderPlayer = new AudioRecorderPlayer();
        this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
    }

  componentDidMount(){
    song = new Sound('demobeat.mp3', Sound.MAIN_BUNDLE, (error) => {
      if(error)
        ToastAndroid.show('Error when init Sound ',ToastAndroid.SHORT);
    });
  }
 

    /////Animation functions

    _runAnimation() {
      const { animated, opacityA } = this.state;
      Animated.loop(
          Animated.parallel([
              Animated.timing(animated, {
                  toValue: 1,
                  duration: 100,
              }),
              Animated.timing(opacityA, {
                  toValue: 0.5,
                  duration: 100,
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
      this.setState({ isPressed: !this.state.isPressed, recording: true,});
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
          //this.onStartRecord();
          this._runAnimation();
          return (
              <Animated.View style={{
                  width: 175,
                  height: 175,
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
         //this.onStopRecord();
          return (
              <View style={{
                  width: 175,
                  height: 175,
                  borderRadius: 125,
                  backgroundColor: 'rgba(153,0,0,0.4)',
              }}>
                  {/* icon or image */}
              </View>
          );
      }
  }


    onStartRecord = async () => {
        console.log('Record button clicked');
        if(!this.state.isPressed){
          this.setState({ isPressed: !this.state.isPressed });
        }else{
          this.setState(
              state => ({ isPressed: !state.isPressed })
          );}
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Permissions for write access',
                message: 'Give permission to your storage to write a file',
                buttonPositive: 'ok',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('You can use the storage');
            } else {
              console.log('permission denied');
              return;
            }
          } catch (err) {
            console.warn(err);
            return;
          }
        }
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
              {
                title: 'Permissions for write access',
                message: 'Give permission to your storage to write a file',
                buttonPositive: 'ok',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('You can use the camera');
            } else {
              console.log('permission denied');
              return;
            }
          } catch (err) {
            console.warn(err);
            return;
          }
        }
        const path = Platform.select({
          ios: 'hello.m4a',
          android: 'sdcard/Android/data/com.dopamine/record.wav',
        });
        
        const audioSet: AudioSet = {
          AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
          AudioSourceAndroid: AudioSourceAndroidType.MIC,
          AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
          AVNumberOfChannelsKeyIOS: 2,
          AVFormatIDKeyIOS: AVEncodingOption.aac,
        };
        console.log('audioSet', audioSet);
        if(song != null) {
          song.setSpeed(this.props.beat);
          song.setVolume(0.5);
          song.setSystemVolume(0.5);
          song.play((success) => {
            if(!success)
              ToastAndroid.show('Error when play Sound ',ToastAndroid.SHORT);
          });
        }
        const uri = await this.audioRecorderPlayer.startRecorder(path,audioSet);
        this.audioRecorderPlayer.addRecordBackListener((e: any) => {
          this.setState({
            recordSecs: e.current_position,
            recordTime: this.audioRecorderPlayer.mmssss(
              Math.floor(e.current_position),
            ),
          });
        });
        //console.log('uri: ${uri}');
      };

      onStopRecord = async () => {
        song.pause();
        const result = await this.audioRecorderPlayer.stopRecorder();

        this.audioRecorderPlayer.removeRecordBackListener();
        if(!this.state.isPressed){
          this.setState({ isPressed: !this.state.isPressed,
          recordSecs: 0,
        });
        }else{
          this.setState(
              state => ({ isPressed: !this.state.isPressed,
              recordSecs: 0,
            })
          );}
        console.log(result);
      };

      onStartPlay = async () => {
        console.log('onStartPlay');
        const path = Platform.select({
          ios: 'hello.m4a',
          android: 'sdcard/Android/data/com.dopamine/record.wav',
        });
        const msg = await this.audioRecorderPlayer.startPlayer(path);
        this.audioRecorderPlayer.setVolume(1.0);
        console.log('message',msg);
        this.setState({playState:'playing'})
        this.audioRecorderPlayer.addPlayBackListener((e: any) => {
          if (e.current_position === e.duration) {
            console.log('finished');
            this.setState({playState:'paused'});
            this.audioRecorderPlayer.stopPlayer();
            this.audioRecorderPlayer.removePlayBackListener();
          }
          this.setState({
            currentPositionSec: e.current_position,
            currentDurationSec: e.duration,
            playTime: this.audioRecorderPlayer.mmssss(
              Math.floor(e.current_position),
            ),
            duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
          });
        });
      };

      onPausePlay = async () => {
        await this.audioRecorderPlayer.pausePlayer();
        this.audioRecorderPlayer.removePlayBackListener();
        this.setState({playState:'paused'})
      };

      onStopPlay = async () => {
        console.log('onStopPlay');
        this.setState({playState:'paused',playTime:'00:00:00',currentPositionSec: 0})
        this.audioRecorderPlayer.stopPlayer();
        this.audioRecorderPlayer.removePlayBackListener();
      };

chk_before_nxt() {
        //if(! this.state.isPressed){
        if(song.isPlaying()){
          song.pause();
          this._onPress();
        //this.setState({ isPressed: !this.state.isPressed, pause: !this.state.pause });
      }
  }


  render() {
    // const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
    // const durationString = this.getAudioTimeString(this.state.duration);
    
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
          
          <Text style = {{fontSize:30, color: '#fff',padding: 20}}>Beat Speed Selected: {this.props.beat}</Text>
          {/* <TouchableOpacity onPress={this._onPress}> */}
                    {this._micButton()}
          {/* </TouchableOpacity> */}

    <Text style={{color:'#fff', alignSelf:'center',fontSize: 30,padding: 10}}>{this.state.recordTime}</Text>
          {/* <Modal
          transparent={true}
          visible={this.state.modalshow}
          >
          <View style={{backgroundColor:'#00a',flex:1}}>
            <View style={{backgroundColor:'#fff',margin: 50,padding: 40, borderRadius: 10}}>
              <Text style={{fontSize: 22}}>On Confirming your recording will be sent to our processing module. Are you sure you want to Continue?</Text>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                style={{padding:10}} onPress={Actions.importsong}>
                  <Text style={{fontSize:22}}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={{padding:10}} onPress={this.setState({modalshow:false})}>
                  <Text style={{fontSize:22}}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          </Modal> */}
          <Slider style={styles.slider} 
          // onTouchStart={this.onSliderEditStart}
          // onTouchEnd={this.onSliderEditEnd}
          //onValueChange={this.onSliderEditing}
          value={this.state.currentPositionSec} 
          maximumValue={this.state.currentDurationSec} 
          maximumTrackTintColor='gray' 
          minimumTrackTintColor='white' 
          thumbTintColor='white' 
          />
          <Text style={{color:'white', alignSelf:'center'}}>{this.state.playTime}/{this.state.duration}</Text>

          <View style={{flexDirection:'row',marginTop:10}}> 
          <TouchableOpacity style={styles.button} onPress={this.onStartRecord}>
                <Text style={styles.buttontext}>Record</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.onStopRecord}>
                <Text style={styles.buttontext}>Stop</Text>
        </TouchableOpacity>
          </View>

          <View style={{flexDirection:'row',}}>

          {this.state.playState == 'playing' &&
          <TouchableOpacity style={
            styles.button
          } onPress={this.onPausePlay}>
            <Text style={styles.buttontext}>Pause</Text>
          </TouchableOpacity>}
          {this.state.playState == 'paused' &&
          <TouchableOpacity style={
              styles.button
          } onPress={this.onStartPlay}>
            <Text style={styles.buttontext}>Play</Text>
          </TouchableOpacity>}
          <TouchableOpacity style={styles.button} onPress={this.onStopPlay}>
                <Text style={styles.buttontext}>Stop</Text>
        </TouchableOpacity>
          </View>

          <View style={{flexDirection:'row',}}> 
          <TouchableOpacity style={styles.button} onPress={()=>{this.chk_before_nxt();Actions.homepage;}}>
                <Text style={styles.buttontext}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>{this.chk_before_nxt();Actions.importsong;}}>
                <Text style={styles.buttontext}>Next</Text>
        </TouchableOpacity>
          </View>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#1b1c1b',
    flexDirection: 'column',
    height: Dimensions.get('screen').height,
  },
  slider:{
    width:350,
    height: 50
  },
  button: {
    margin: 10,
    borderRadius: 30,
    padding: 20,
    paddingHorizontal: 50,
    backgroundColor: '#fff',
  },
  text: {
    color: '#fff',
    fontFamily: 'Serif',
    fontSize: 25,
  },
  buttontext: {
    color: '#1b1c1b',
    fontSize: 18,
    fontWeight: '900',
    fontFamily: 'Serif',
  },
});