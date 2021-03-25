import React from 'react';
import {View,FlatList,Text,TouchableOpacity} from 'react-native';
import {List} from 'react-native-paper';
import firebase from 'firebase';
import db from '../config';
import Header from '../components/Header';

import SwipeableFlatList from '../components/SwipeableFlatList'
export default class NotificationsScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userId:firebase.auth().currentUser.email,
      allNotifications:[]
    }
    this.notificationsRef
  }
getNotifications=()=>{
  this.notificationsRef = db.collection("all_notifications").where("notification_status","==","unread")
  .onSnapshot(snapshot =>{
    var allNotifications = []
    snapshot.docs.map(doc =>{
      var notification = doc.data()
      notification["doc_id"] = doc.id
      allNotifications.push(notification)
    })
    this.setState({
      allNotifications:allNotifications
    })
  
  })
  
}
componentDidMount(){
  this.getNotifications()
}
componentWillUnmount(){
  this.notificationsRef()
}
keyExtractor = (index,item)=>index.toString()

renderItem = ({index,item}) =>{
  return(
    <List.Item
    title = {item.item_name}
    description = {item.message}/>
  )
}
  render(){
    return(
      <View>
      <Header title="Notifications" navigation = {this.props.navigation}/>
              <SwipeableFlatList
                allNotifications={this.state.allNotifications}
              />
      </View>
    )
  }
}