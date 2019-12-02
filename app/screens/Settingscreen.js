import React from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  TouchableOpacity,
} from 'react-native';
import { Header, Left, Title, Body, Right, Button, Container, Icon} from 'native-base';
import AudioRecorderPlayer from "react-native-audio-recorder-player";

export default class Settingscreen extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      recordSecs: 0,
      recordTime: 0,
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: 0,
      duration: 0,
    };
      // const audioRecorderPlayer = new AudioRecorderPlayer();
  }

  componentWillMount() {
    const audioRecorderPlayer = new AudioRecorderPlayer();
  }

  onStartRecord = async () => {
    const result = await this.audioRecorderPlayer.startRecorder();
    this.audioRecorderPlayer.addRecordBackListener((e) => {
      this.setState({
        recordSecs: e.current_position,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position),
        ),
      });
      return;
    });
    console.log(result);
  };
  
  onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });
    console.log(result);
  };

  onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await this.audioRecorderPlayer.startPlayer();
    console.log(msg);
    this.audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.current_position === e.duration) {
        console.log('finished');
        this.audioRecorderPlayer.stopPlayer();
      }
      this.setState({
        currentPositionSec: e.current_position,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
      return;
    });
  };

  onPausePlay = async () => {
    await this.audioRecorderPlayer.pausePlayer();
  };

  onStopPlay = async () => {
    console.log('onStopPlay');
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };

  
  render() {
    // const audioRecorderPlayer = new AudioRecorderPlayer();
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

          <TouchableOpacity onPress={this.onStartRecord} style={styles.button}>
          <Text style={styles.buttontext}>Start Record</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onStopRecord} style={styles.button}>
          <Text style={styles.buttontext}>Stop Record</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onStartPlay} style={styles.button}>
          <Text style={styles.buttontext}>Start Play</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onPausePlay} style={styles.button}>
          <Text style={styles.buttontext}>Pause Play</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onStopPlay} style={styles.button}>
          <Text style={styles.buttontext}>Stop Play</Text>
          </TouchableOpacity>
        

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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
})