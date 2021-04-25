import React from 'react';
import Youtube from 'react-youtube';
import firebase from 'firebase';
import db from '../configDatabase';
import ReactNative, {
  NativeModules,
  YouTubeModule,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      sessionId: this.props.navigation.getParam('sessionId'),
      time: 0,
      state: 0,
      isFullScreen: 0,
    };
  }

  getData = async (event) => {
    await db.ref('sessions/' + this.state.sessionId).on('value', (data) => {
      this.setState({
        time: data.val().time,
        id: data.val().id,
        state: data.val().state,
      });
    });

    var player = event.target;
    var state = this.state.state;

    if (state == 1) return player.playVideo();
    else if (state == 2) return player.pauseVideo();
    else if (state == 3) return player.pauseVideo();
  };

_onStateChange=(event)=>{
  this.getData(event)
  var player = event.target;
  var state = this.state.state;
  
  db.ref("sessions/"+this.state.sessionId ).on('value',()=>{
    if (state == 1) return player.playVideo();
    else if (state == 2) { player.pauseVideo();player.seekTo(this.state.time)}
    else if (state == 3) return player.pauseVideo();
  })
}

  render() {
    return (
      <View>
        <Youtube
          videoId={this.state.id}
          opts={{
            height: 300,
            width: 340,
            playerVars: { controls: 0, rel: 0, modestbranding: 1 },
          }}
          onReady = {this._onStateChange}
          onStateChange={this._onStateChange}
        />
      </View>
    );
  }
}
