import * as React from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import { List } from 'react-native-paper';
import firebase from 'firebase';
import db from '../config';
import Header from '../components/Header';
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';

export default class HomeScreen extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      requestedItems: [],
      userDocId:'',
    };
    this.request_ref = null;
  }
getUserDetails=()=>{
  db.collection("users")
  .where("email","==",this.state.userId)
  .onSnapshot(snapshot =>{
    snapshot.forEach(doc => {
      this.setState({
        userDocId:doc.id
      })
    })
  })
}
  getRequestedItems = () => {
    this.request_ref = db
      .collection('exchange_requests')
      .onSnapshot((snapshot) => {
        var itemsList = snapshot.docs.map((doc) => doc.data());
        this.setState({
          requestedItems: itemsList,
        });
      });
  };
  registerForPushNotifications=async()=>{
    const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    var finalStatus = status
    if(status !== "granted"){
        const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        finalStatus = status
    }
    if(finalStatus !== "granted"){
        alert("Notifications Permission Not Granted")
        return;
    }

    var token = (await Notifications.getExpoPushTokenAsync()).data
    return token;
}
  async componentDidMount(){
    this.getRequestedItems()
    this.getUserDetails()
    await this.registerForPushNotifications()
    .then((token)=>{
      db.collection("users").doc(this.state.userDocId).add({
        pushToken:token
      })
    })
    .catch(error=>console.log(error))
} 
  renderItem = ({ item, i }) => {
    return (
      <List.Item
        key={i}
        title={item.item_name}
        description={item.item_description}
        onPress = {()=>{this.props.navigation.navigate("RecieverDetails",{"details":item})}}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        bottomDivider
      />
    );
    
  }
  keyExtractor = (item, index) => index.toString();
  render() {
  
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Header title="List Of All Items" navigation = {this.props.navigation}/>
          {
            this.state.requestedItems.length === 0
              ? (
                <View style={styles.subContainer}>
                  <Text style={{ fontSize: 20 }}>List Of All exchange offers ...</Text>
                </View>
              )
              : (
                <View>
                  <FlatList
                    data={this.state.requestedItems}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                  />
                </View>
              )
          }
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff5722',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  container:{
    flex:1,
    backgroundColor:"rgba(255, 250, 242,0.5)"
  }
});
