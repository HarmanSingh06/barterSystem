import * as React from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import Header from '../components/Header';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
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
  componentWillUnmount() {
    this.requestRef();
  }
  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.item_name}
        subtitle={item.item_description}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: '#ffff' }}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  };

  render() {
    return(   
      <View style={{flex:1}}>
        <View style={{flex:1}}>
        <Header title="List Of All Items"/>
          {
            this.state.requestedItems.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All exchange offers ...</Text>
              </View>
            )
            :(
                <View>
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedItems}
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
