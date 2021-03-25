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

export default class HomeScreen extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      requestedItems: [],
    };
    this.request_ref = null;
  }

  getRequestedItems = () => {
    this.request_ref = db
      .collection('exchange_requests')
      .onSnapshot((snapshot) => {
        var booksList = snapshot.docs.map((doc) => doc.data());
        this.setState({
          requestedItems: booksList,
        });
      });
  };
  componentDidMount() {
    this.getRequestedItems();
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
      <View style={{ flex: 1 }}>
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
});
