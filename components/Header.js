import React, { Component } from 'react';
import { Header, Icon, Badge } from 'react-native-elements';
import { View, Text, StyeSheet, Alert } from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class MyHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '',
    userId:firebase.auth().currentUser.email
    };
  }

  getNumberOfUnreadNotification = () => {
    db.collection('all_notifications')
      .where('notification_status', '==', 'unread')
      .where('target_user_id', '==', this.state.userId)
      .onSnapshot((snapshot) => {
        var unreadNotifications = snapshot.docs.map((doc) => doc.data());
        this.setState({
          value: unreadNotifications.length,
        });
      });
  };

  componentDidMount() {
    this.getNumberOfUnreadNotification();
  }
  render() {
    const BellIconWithBadge = () => {
      return (
        <View>
          <Icon
            name="notification"
            type="antdesign"
            color="#696969"
            size={25}
            onPress={() => this.props.navigation.navigate('Notifications')}
          />
          
          <Badge
            value={this.state.value}
            containerStyle={{ position: 'absolute', top: -4, right: -4 }}
          />
        </View>
      );
    };
    return (
      <Header
        leftComponent={
          <Icon
            name="bars"
            type="antdesign"
            color="#696969"
            onPress={() => this.props.navigation.toggleDrawer()}
          />
        }
        centerComponent={{
          text: this.props.title,
          style: { color: '#90A5A9', fontSize: 20, fontWeight: 'bold' },
        }}
        rightComponent={<BellIconWithBadge {...this.props} />}
        backgroundColor="#eaf8fe"
      />
    );
  }
}
