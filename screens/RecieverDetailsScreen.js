import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import db from '../config.js';
import firebase from 'firebase';
import Header from '../components/Header';
import * as Notifications from 'expo-notifications';

export default class RecieverDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemDescription: this.props.navigation.getParam('details')
        .item_description,
      itemName: this.props.navigation.getParam('details').item_name,
      requestId: this.props.navigation.getParam('details').request_id,
      recieverId: this.props.navigation.getParam('details').user_id,
      itemValue:this.props.navigation.getParam('details').value,
      userId: firebase.auth().currentUser.email,
      userName: '',
      recieverName: '',
      recieverAddress: '',
      recieverEmailAddress: '',
      recieverContact: '',
      recieverRequestDocId: '',
      recieverPushToken:''
    };
  }
  static navigationOptions = {header:null}
  getUserDetails() {
    db.collection('users')
      .where('email', '==', this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            userName: doc.data().first_name + ' ' + doc.data().last_name,
          });
        });
      });
  }
  getRecieverDetails() {
    db.collection('users')
      .where('email', '==', this.state.recieverId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var name = doc.data().first_name + '' + doc.data().last_name;
          this.setState({
            recieverName: name,
            recieverAddress: doc.data().address,
            recieverContact: doc.data().contact,
            recieverEmailAddress: doc.data().email,
            recieverPushToken:doc.data().pushToken
          });
        });
      });
console.log(this.state.recieverPushToken)
    db.collection('exchange_requests')
      .where('request_id', '==', this.state.requestId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            recieverRequestDocId: doc.id,
          });
        });
      });
  }
  addNotification = async() => {
    var message = this.state.userName + ' ' + 'Wants to Exchange Item';
    db.collection('all_notifications').add({
      item_name: this.state.itemName,
      target_user_id: this.state.recieverId,
      donor_id: this.state.userId,
      request_id: this.state.requestId,
      requested_by: this.state.recieverName,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      notification_status: 'unread',
      message: message,
    });
  
    const pushMessage = {
      to:this.state.recieverPushToken,
      title:'Request Accepted',
      body:message
    }
    await fetch('https://exp.host/--/api/v2/push/send',{
      method:'POST',
      headers:{
        'Accept-encoding':'gzip, deflate',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(pushMessage)
    })
  };
  updateItemStatus = () => {
    db.collection('all_item_donations').add({
      item_name: this.state.itemName,
      request_id: this.state.requestId,
      requested_by: this.state.recieverName,
      donor_id: this.state.userId,
      request_status: 'Donor Interested',
    });
  };
  componentDidMount() {
    this.getRecieverDetails();
    this.getUserDetails();
  }
  render() {
    return (
      <ScrollView>
      <Header title="Reciever Details" navigation = {this.props.navigation}/>
        <Card>
          <Card.Title style={{ fontSize: 20 }}>Item Information</Card.Title>
          <Card>
            <Text>Item Name: {this.state.itemName}</Text>
          </Card>
          <Card>
            <Text>Item Description: {this.state.itemDescription}</Text>
          </Card>

                    <Card>
            <Text>Item Value: {this.state.value}</Text>
          </Card>
        </Card>

        <Card>
          <Card.Title style={{ fontSize: 20 }}>Reciever Information</Card.Title>

          <Card>
            <Text>Name: {this.state.recieverName}</Text>
          </Card>

          <Card>
            <Text>Contact: {this.state.recieverContact}</Text>
          </Card>
          <Card>
            <Text>Address: {this.state.recieverAddress}</Text>
          </Card>
          <Card>
            <Text>Email Address: {this.state.recieverEmailAddress}</Text>
          </Card>
        </Card>

        <TouchableOpacity
          onPress={() => {
            this.addNotification(this.state.recieverPushToken);
            this.updateItemStatus();
          }}>
          <Text>Exchange</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
