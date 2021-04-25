import React from 'react';
import Youtube from 'react-youtube';
import firebase from 'firebase';
import db from '../configDatabase';
import ReactNative, { NativeModules, YouTubeModule } from 'react-native';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.navigation.getParam('id'),
      sessionId: this.props.navigation.getParam('session'),
      time: 0,
      state: 0,
    };
  }
  getData = (event) => {
    var time = event.target.getCurrentTime();
    var state = event.target.getPlayerState();

    this.setState({
      time: time,
      state: state,
    });
    this.updateData();
  }
  updateData = () => {
    var update = db.ref('sessions/' + this.state.sessionId).update({
      time: this.state.time,
      state: this.state.state,
    });
  };

  render() {
    return (
      <Youtube
        videoId={this.state.id}
        opts={{ height: 300, width: 340 }}
        onStateChange={this.getData}
      />
    );
  }
}
