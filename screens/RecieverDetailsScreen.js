import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';


export default class RecieverDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: firbase.auth().currentUser.email,
            itemName: this.props.navigation.navigate.getParam("details")["item_name"],
            itemDescription: this.props.navigation.navigate.getParam("details")["item_description"],
            recieverId: this.props.navigation.navigate.getParam("details")["user_id"],
            requestId: this.props.navigation.navigate.getParam("details")["random_id"],
            recieverName: '',
            recieverRequestDocId: '',
            recieverAddress: '',
            recieverContact: ''

        }
    }
    getUserDetails = () => {
        db.collection('users').where("email", "==", this.state.userId).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    this.setState({
                        recieverName: doc.data().first_name,
                        recieverAddress: doc.date().address,
                        recieverContact: doc.data().contact,

                    })
                })
            })

        db.collection("exchange_requests").where("request_id", "==", this.state.requestId)
            .get()
            .then(snapshot => {
                snapshot.forEach(data => {
                    this.setState({ recieverRequestDocId: data.id })
                })
            })
    }
    updateItemStatus = () => {
        db.collection("all_item_requests").add({
            item_name:this.state.bookName,
            item_description:this.state.itemDescription,
            requested_by:this.state.recieverName
        })
    }

    componentDidMount(){
        this.getUserDetails()
    }
    render() {
        return(
            <View style={styles.container}>
              <View style={{flex:0.1}}>
                <Header
                  leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
                  centerComponent={{ text:"Donate Books", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
                  backgroundColor = "#eaf8fe"
                />
              </View>
              <View style={{flex:0.3}}>
                <Card
                    title={"Book Information"}
                    titleStyle= {{fontSize : 20}}
                  >
                  <Card >
                    <Text style={{fontWeight:'bold'}}>Name : {this.state.itemName}</Text>
                  </Card>
                  <Card>
                    <Text style={{fontWeight:'bold'}}>Description : {this.state.itemDescription}</Text>
                  </Card>
                </Card>
              </View>
              <View style={{flex:0.3}}>
                <Card
                  title={"Reciever Information"}
                  titleStyle= {{fontSize : 20}}
                  >
                  <Card>
                    <Text style={{fontWeight:'bold'}}>Name: {this.state.recieverName}</Text>
                  </Card>
                  <Card>
                    <Text style={{fontWeight:'bold'}}>Contact: {this.state.recieverContact}</Text>
                  </Card>
                  <Card>
                    <Text style={{fontWeight:'bold'}}>Address: {this.state.recieverAddress}</Text>
                  </Card>
                </Card>
              </View>
              <View style={styles.buttonContainer}>
                {
                  this.state.recieverId !== this.state.userId
                  ?(
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{
                          this.updateItemStatus()
                          this.props.navigation.navigate('MyDonations')
                        }}>
                      <Text>I want to Donate</Text>
                    </TouchableOpacity>
                  )
                  : null
                }
              </View>
            </View>
          )
    }
}