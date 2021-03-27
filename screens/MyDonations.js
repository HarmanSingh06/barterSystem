import React from 'react';
import {Text,FlatList,View,ToucbaleOpacity} from 'react-native';
import {List} from 'react-native-paper';
import firebase from 'firebase';
import db from '../config'
import Header from '../components/Header'
export default class MyDonations extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      donorId:firebase.auth().currentUser.email,
      donorName:'',
      allDonations:[],
      targetUserId:'',
    }
    this.requestRef = null
  }
  getDonorDetails=()=>{
    db.collection("users").where("email","==",this.state.donorId).get()
    .then(snapshot =>{
      snapshot.forEach(doc=>{
        this.setState({
            donorName:doc.data().first_name + " " + doc.data().last_name          
        })
      })
    })
  }

  getAllDonations=()=>{
    this.requestRef = db.collection("all_item_donations").where("donor_id","==",this.state.donorId)
    .onSnapshot(snapshot =>{
      var allDonations = []
      snapshot.docs.map(doc =>{
        var donation = doc.data()
        donation["doc_id"] = doc.id
        allDonations.push(donation)
      })
    this.setState({
      allDonations:allDonations
    })
    });
  }

  sendBook=(itemDetails)=>{
    if(itemDetails.request_status === "Item Sent"){
      db.collection("all_item_donations").doc(itemDetails.doc_id).update({
        "request_status":"Donor Interested"
      })
      this.sendNotification(itemDetails,"Donor Interested")
    }
      else {
        db.collection("all_item_donations").doc(itemDetails.doc_id).update({
          "request_status":"Item Sent"
        })
        this.sendNotification(itemDetails,"Item Sent")
      }
    }
  sendNotification=async(itemDetails,requestStatus)=>{
    var requestId = itemDetails.request_id
    var donorId = itemDetails.donor_id
    var pushToken = itemDetails.target_notification_push_token;
    db.collection("all_notification")
    .where("request_id","==",requestId)
    .where("donor_id","==",donorId)
    .get()
    .then(snapshot =>{
      snapshot.forEach(doc =>{
        var message = ""
        if(requestStatus === "Item Sent"){
          message = this.state.donorName = " sent you the book"
        }
        else {message = this.state.donorName + " has shown interest in donating the item"}
        db.collection("all_notifications").doc(doc.id).update({
          "message":message,
          "notification_status":"unread",
          "date": firebase.firestore.FieldValue.serverTimestamp()
        })
      })
    })
    const pushMessage = {
      to:pushToken,
      title:'Item Sent',
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
  }


  keyExtractor = (item,index) => index.toString()

  renderItem = ({item,i})=>{
    return(
      <List.Item
      title = {item.item_name}
      description = {"Requested By:"+ " "+ item.requested_by + "\nStatus:" + " "+ item.request_status }
      style  = {{backgroundColor:item.request_status === "Item Sent" ? "green":"#ff5722"}}
      onPress = {()=>{
        this.sendBook(item)
      }}/>
    )
  }
     componentDidMount(){
     this.getDonorDetails()
     this.getAllDonations()
   }
  render(){
    return(
    <View style={{flex:1}}>
    <Header title="My Donations" navigation = {this.props.navigation} />
           {
             this.state.allDonations.length === 0
             ?(
               <View>
                 <Text style={{ fontSize: 20,textAlign:"center",marginTop:150}}>List of all item Donations</Text>
               </View>
             )
             :(
               <FlatList
                 keyExtractor={this.keyExtractor}
                 data={this.state.allDonations}
                 renderItem={this.renderItem}
               />
             )
           }
         </View>
    )
  }
}