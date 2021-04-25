import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';

import db from '../configDatabase';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      link: '',
      roomId: '',
      isCreateSessionModalVisible: false,
      isJoinSessionModalVisible: false,
    };
  }

  //The Modals----------------------------------------------------------------
  showCreateSessionModal() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.isCreateSessionModalVisible}>
        <KeyboardAvoidingView>
          <Text>Video Link</Text>
          <TextInput
            placeholder="URL of the Video"
            onChangeText={(text) => {
              this.setState({
                link: text,
              });
            }}
          />
          <TouchableOpacity
            onPress={() => {
              this.createSession();
            }}>

            <Text>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                isCreateSessionModalVisible:false
              });
            }}>
            <Text>Close</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>
    );
  }

  showJoinSessionModal() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.isJoinSessionModalVisible}>
        <KeyboardAvoidingView>
          <Text>Video Link</Text>
          <TextInput
            placeholder="Room Id"
            onChangeText={(text) => {
              this.setState({
                roomId: text,
              });
            }}
          />
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('ChildPlayer', {
                sessionId: this.state.roomId,
              });
            }}>
            <Text>Join</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                isJoinSessionModalVisible:false
              });
            }}>
            <Text>Close</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
  //The modals ------------------------------------------------------------------------------

  createSession = () => {
    var id = this.state.link.slice(32);
    const sessionId = Math.random().toString(36).substring(7);
    db.ref('sessions/' + sessionId).set({
      id: id,
      time: 0,
      state: 0,
    });
    this.props.navigation.navigate('HostPlayer', {
      id: id,
      session: sessionId,
    });
  };

  render() {
    return (
      <View>
        {this.showCreateSessionModal()}
        {this.showJoinSessionModal()}
        <TouchableOpacity
          onPress={() => {
            this.setState({
              isJoinSessionModalVisible: true,
            });
          }}>
          <Text>Join Session</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.setState({
              isCreateSessionModalVisible: true,
            });
          }}>
          <Text>Create Session</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
