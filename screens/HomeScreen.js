import * as React from 'react';
import {Text,FlatList,TouchableOpacity,StyleSheet,View} from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config';

export default class HomeScreen extends React.Component{
constructor(){
    super()
    this.state = {
        userId:firebase.auth().currentUser.email,
        requestedItems:[]
    }
    this.request_ref = null
}

getRequestedItems=()=>{
    this.request_ref = db.collection("exchange_requests")
    .onSnapshot((snapshot)=>{
        var booksList =  snapshot.docs.map((doc)=>doc.data());
        this.setState({
            requestedItems:booksList
        })
    })
}
componentDidMount(){
    this.getRequestedItems()
}

keyExtractor = (item,index) => index.toString();

renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.item_name}
        titleStyle={{ color: 'green', fontWeight: 'bold',fontSize:30 }}
        rightElement={
            <TouchableOpacity style={styles.button}>
              <Text style={{color:'#ffff'}}>View</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
  }
    render(){
        return(
            <View style = {{flex:1}}>
                <FlatList
                keyExtractor = {this.keyExtractor}
                data = {this.state.requestedItems}
                renderItem = {this.renderItem}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    }
  })