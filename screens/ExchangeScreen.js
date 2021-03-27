import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import Header from '../components/Header';


export default class ExchangeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      itemName: '',
      itemDescription: '',
      exchangedId: '',
      isExchangeRequestActive: '',
      requestedItemName: '',
      requestId: '',
      itemStatus: '',
      docId: '',
      userDocId: '',
      value: '',
      currencyCode:'',
      pushToken:'',
    };
  }

  getUserDetails() {
    db.collection('users')
      .where('email', '==', this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var name = doc.data().first_name + ' ' + doc.data().last_name;

          this.setState({
            username: name,
            currencyCode:doc.data().currency_code,
            pushToken:doc.data().pushToken
          });
        });
      });
      console.log(this.state.pushToken)
  }

  addItem =async (name, description) => {
    if (this.state.itemName == '') {
      alert('Enter Item Name');
    } else if (this.state.itemDescription == '') {
      alert('Enter Description');
    } else {
      var randomId = Math.random().toString(36).slice(2)
      console.log(this.state.userId,name,description,randomId,this.state.value,this.state.pushToken)
     await db.collection('exchange_requests').add({
        "user_id": this.state.userId,
        "item_name": name,
        "item_description": description,
        "request_id":randomId ,
        "item_status": 'requested',
        "value": this.state.value,
        "target_notification_push_token":this.state.pushToken
      });
      this.setState({
        itemName: '',
        itemDescription: '',
        value: '',
      });
      db.collection('users')
        .where('email', '==', this.state.userId)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            db.collection('users').doc(doc.id).update({
              isExchangeRequestActive: true,
            });
          });
        });

      return Alert.alert('Item Added', '', [
        {
          text: 'OK',
          onPress: () => this.props.navigation.navigate('HomeScreen'),
        },
      ]);
    }
  };
  
  getItemRequest = async () => {
    var itemRequest = await db
      .collection('exchange_requests')
      .where('user_id', '==', this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().item_status !== 'recieved') {
            console.log(doc.data().request_id)
            this.setState({
              requestId: doc.data().request_id,
              requestedItemName: doc.data().item_name,
              itemStatus: doc.data().item_status,
              value:doc.data().value,
              docId: doc.id,
            });
          }
        });
      });
  };

 getData(value){
   var globalValue;
   fetch(`http://data.fixer.io/api/latest?access_key=23dc3ed7a50ef6484e54cecdafbb9e2e&symbols=${this.state.currencyCode}`,
   {mode:'cors'})
   .then(response =>{
     return response.json()
   })
   .then(responseData =>{
     var currencyRate = (responseData.rates)
     globalValue = value/currencyRate
     return globalValue
   })
   .catch(error=>console.log(error))
}

  getIsItemRequestActive() {
    db.collection('users')
      .where('email', '==', this.state.userId)
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            isExchangeRequestActive: doc.data().isExchangeRequestActive,
            userDocId: doc.id,
          });
        });
      });
  }
  updateItemRequestStatus = () => {
    db.collection("exchange_requests").doc(this.state.docId).update({
      book_status: 'recieved',
    });
    db.collection('users').doc(this.state.userDocId).update({
      isExchangeRequestActive: false,
    });

  };

  sendNotification = () => {
    db.collection('users')
      .where('email', '==', this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var name = doc.data().first_name + ' ' + doc.data().last_name;
          db.collection('all_notifications')
            .where('request_id', '==', this.state.requestId)
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                var donorId = doc.data().donor_id;
                var itemName = doc.data().item_name;
                db.collection('all_notifications').add({
                  target_user_id: donorId,
                  message: name + ' ' + 'recieved the item' + itemName,
                  notification_status: 'unread',
                  item_name: itemName,
                });
              });
            });
        });
      });
  };
  receivedItems = (itemName) => {
    var userId = this.state.userId;
    var requestId = this.state.requestId;
    console.log(userId,itemName,requestId)
    db.collection('recieved_items').add({
      user_id: userId,
      item_name: itemName,
      requestId: requestId,
      item_status: 'recieved',
    });
  };

  async componentDidMount() {
    await this.getIsItemRequestActive();
    await this.getUserDetails();
    await this.getItemRequest();
    await this.getData()
  }

  render() {
    if (this.state.isExchangeRequestActive) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View
            style={{
              borderColor: 'orange',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              margin: 10,
            }}>
            <Text>Item Name</Text>
            <Text>{this.state.requestedItemName}</Text>
          </View>
          <View
            style={{
              borderColor: 'orange',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              margin: 10,
            }}>
            <Text>Item Status</Text>
            <Text>{this.state.itemStatus}</Text>
          </View>
                    <View
            style={{
              borderColor: 'orange',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              margin: 10,
            }}>
            <Text>Item Value</Text>
            <Text>{this.state.value}</Text>
          </View>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: 'orange',
              backgroundColor: 'orange',
              width: 300,
              alignSelf: 'center',
              alignItems: 'center',
              height: 30,
              marginTop: 30,
            }}
            onPress={() => {
              this.sendNotification();
              this.updateItemRequestStatus();
              this.receivedItems(this.state.requestedItemName);
            }}>
            <Text>I recieved the Item </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <Header title="Exchange Items" navigation={this.props.navigation} />

          <TextInput
            style={styles.textBox}
            placeholder="Item Name"
            onChangeText={(text) => {
              this.setState({ itemName: text });
            }}
            value={this.state.itemName}
          />

          <TextInput
            style={styles.textBox}
            placeholder="Item Description"
            onChangeText={(text) => {
              this.setState({ itemDescription: text });
            }}
            multiline={true}
            value={this.state.itemDescription}
          />
          <TextInput
            keyboardType="numeric"
            placeholder="Value"
            style={styles.textBox}
            onChangeText={(text) => {
              this.setState({
                value: text,
              });
            }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.addItem(this.state.itemName, this.state.itemDescription);
              Keyboard.dismiss();
              this.props.navigation.toggleDrawer();
            }}>
            <Text style={styles.buttonText}>Add Item</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  textBox: {
    borderBottomWidth: 2,
    borderColor: '#000000',
    margin: 20,
    marginBottom: 10,
    marginTop: 40,
  },
  button: {
    borderColor: 'black',
    borderWidth: 1,
    margin: 40,
    marginLeft: 120,
    marginRight: 120,
    borderRadius: 10,
    padding: 5,
  },
  buttonText: {
    color: '#9996aa',
    textAlign: 'center',
  },
});
