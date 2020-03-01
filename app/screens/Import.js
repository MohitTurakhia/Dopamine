import React, { Component } from 'react';
import { Platform, StatusBar, Dimensions, StyleSheet, Text, TextInput, Slider, View, TouchableOpacity, LayoutAnimation, Image, ScrollView, Animated, TouchableOpacityComponent } from 'react-native';
import Sound from 'react-native-sound';
//import AudioRecord from 'react-native-audio-record';
import {Actions} from 'react-native-router-flux';
//import AudioRecorder from 'react-native-audio';
import { Header, Left, Title, Body, Icon, Button} from 'native-base';
import ImagePicker from 'react-native-image-picker';


const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb',title: 'Chooose Photo From FB'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  }
};


export default class Import extends Component {

  constructor(props) {
    super(props)
    this.state  = {
      filePath: {
        data: '',
        uri: ''
      },
      fileData: '',
      fileUri: '',
      playState: 'paused',
      playSeconds: 0,
      duration: 0
    }
    this.sliderEditing = false;
  }

  componentDidMount(){
    //this.play();
    
    this.timeout = setInterval(() => {
        if(this.sound && this.sound.isLoaded() && this.state.playState == 'playing' && !this.sliderEditing){
            this.sound.getCurrentTime((seconds, isPlaying) => {
                this.setState({playSeconds:seconds});
            })
        }
    }, 100);
  }

  componentWillUnmount(){
    if(this.sound){
        this.sound.release();
        this.sound = null;
    }
    if(this.timeout){
        clearInterval(this.timeout);
    }
  }

  onSliderEditStart = () => {
    this.sliderEditing = true;
  }
  onSliderEditEnd = () => {
    this.sliderEditing = false;
  }
  onSliderEditing = value => {
    if(this.sound){
        this.sound.setCurrentTime(value);
        this.setState({playSeconds:value});
    }
  }
  
  play = async () => {
    if(this.sound){
        this.sound.play(this.playComplete);
        this.setState({playState:'playing'});
    }else{
        // const filepath = this.props.navigation.state.params.filepath;
        // console.log('[Play]', filepath);

        this.sound = new Sound('demobeat.mp3', '', (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                Alert.alert('Notice', 'audio file error. (Error code : 1)');
                this.setState({playState:'paused'});
            }else{
                this.setState({playState:'playing', duration:this.sound.getDuration()});
                this.sound.play(this.playComplete);
            }
        });    
    }
  }

  playComplete = (success) => {
    if(this.sound){
        if (success) {
            console.log('successfully finished playing');
        } else {
            console.log('playback failed due to audio decoding errors');
            Alert.alert('Notice', 'audio file error. (Error code : 2)');
        }
        this.setState({playState:'paused', playSeconds:0});
        this.sound.setCurrentTime(0);
    }
  }

  pause = () => {
    if(this.sound){
        this.sound.pause();
    }

    this.setState({playState:'paused'});
  }

  jumpPrev15Seconds = () => {this.jumpSeconds(-15);}
    jumpNext15Seconds = () => {this.jumpSeconds(15);}
    jumpSeconds = (secsDelta) => {
        if(this.sound){
            this.sound.getCurrentTime((secs, isPlaying) => {
                let nextSecs = secs + secsDelta;
                if(nextSecs < 0) nextSecs = 0;
                else if(nextSecs > this.state.duration) nextSecs = this.state.duration;
                this.sound.setCurrentTime(nextSecs);
                this.setState({playSeconds:nextSecs});
            })
        }
    }

    getAudioTimeString(seconds){
        const h = parseInt(seconds/(60*60));
        const m = parseInt(seconds%(60*60)/60);
        const s = parseInt(seconds%60);

        return ((h<10?'0'+h:h) + ':' + (m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
    }





  chooseImage = () => {
    let options = {
      title: 'Select Image',
      //customButtons: [{name: 'customOptionKey',title: 'Chooose Photo From Custom Option'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      
      if (response.didCancel) {
        console.log('User Cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri };
        console.log('response',JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });
  }

  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });
  }

  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });
  }

  renderFileData() {
    if (this.state.fileData) {
      return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
        style={styles.images}
      />
    } else {
      return <Image source={require("./album.png")}
        style={styles.images}
      />
    }
  }

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image
        source={{ uri: this.state.fileUri }}
        style={styles.images}
      />
    } else {
      return <Image
        source={require("./album.png")}
        style={styles.images}
      />
    }
  }

  render() {

    const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
    const durationString = this.getAudioTimeString(this.state.duration);


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
          
            <View style={{flexDirection:'row'}}>

            {this.state.playState == 'playing' &&
          <TouchableOpacity style={
              {
                margin: 10,
                marginTop: 50,
                borderRadius: 30,
                padding: 20,
                paddingHorizontal: 20,
                backgroundColor: '#fff',
              }
          } onPress={this.pause}>
            <Text style={styles.buttontext}>Pause</Text>
          </TouchableOpacity>}
          {this.state.playState == 'paused' &&
          <TouchableOpacity style={
              {
                margin: 10,
                marginTop: 50,
                borderRadius: 30,
                padding: 20,
                paddingHorizontal: 20,
                backgroundColor: '#fff',
              }
          } onPress={this.play}>
            <Text style={styles.buttontext}>Play</Text>
          </TouchableOpacity>}

          {/* <Text style={{color:'white', alignSelf:'center'}}>{currentTimeString}</Text> */}
          <View>
          <Slider style={styles.slider} 
          
          onTouchStart={this.onSliderEditStart}
          // onTouchMove={() => console.log('onTouchMove')}
          onTouchEnd={this.onSliderEditEnd}
          // onTouchEndCapture={() => console.log('onTouchEndCapture')}
          // onTouchCancel={() => console.log('onTouchCancel')}
          onValueChange={this.onSliderEditing}
          value={this.state.playSeconds} 
          maximumValue={this.state.duration} 
          maximumTrackTintColor='gray' 
          minimumTrackTintColor='white' 
          thumbTintColor='white' 

          // minimumValue={1}
          // maximumValue={6}
        //   value={this.state.slideValue}
        //   onValueChange={(value)=> this.setState({ slideValue: value}) }
          // maximumTrackTintColor='#fff'  
          // minimumTrackTintColor='#fff'
          // step={1}
          />
          <Text style={{color:'white', alignSelf:'center'}}>{currentTimeString}/{durationString}</Text>
          </View>
            </View>
            <View style={{alignItems: 'center',}}>
            <TouchableOpacity style={styles.button} onPress={Actions.homepage}>
            <Text style={styles.buttontext}>Re-edit</Text>
          </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',marginTop:40}}>
          <View >
          <TouchableOpacity onPress={this.chooseImage}>
          {this.renderFileUri()}</TouchableOpacity>
          </View> 
          <View style={{marginLeft:10}}>
          <TextInput 
            style={styles.inputBox}
            underlineColorAndroid='#fff'
            placeholder='Album Name'
            placeholderTextColor='#fff'
            />
            <TextInput 
            style={styles.inputBox}
            underlineColorAndroid='#fff'
            placeholder='Artist Name'
            placeholderTextColor='#fff'
            />
            <TextInput 
            style={styles.inputBox}
            underlineColorAndroid='#fff'
            placeholder='Genre'
            placeholderTextColor='#fff'
            />
            </View>
          </View>



            <View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttontext}>Export</Text>
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
    height: Dimensions.get('screen').height,
  },
  images: {
    height: 175,
    width: 175,
    backgroundColor: 'white'
  },
  button: {
    margin: 10,
    marginTop: 50,
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
  slider: {
    top: 60,
    width:300,
    height: 50
  },
  inputBox: {
    // width: 300,
    backgroundColor: '#1b1c1b',
   paddingHorizontal: 16,
    // borderRadius: 25,
    fontSize:16,
    color: '#fff',
    // marginVertical: 10,
  }
});