import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, ScrollView, KeyboardAvoidingView, FlatList } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';
import db from "../config"

export default class CustomSideBarMenu extends Component {

  render() {
    return (
      <View>
        <View style={styles.drawerItemsContainer}>
          <DrawerItems {...this.props} />

        </View>
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton}
            onPress={() => {
              this.props.navigation.navigate('SignupLoginScreen')
              firebase.auth().signOut()
            }}>
            <Text>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  drawerItemsContainer: {
    flex: 0.8
  },
  logOutContainer: {
    flex: 0.2,
    justifyContent: 'flex-end',
    paddingBottom: 30
  },
  logoutButton: {
    height: 30,
    width: '100%',
    justifyContent: 'center',
    padding: 10
  },
  logoutText: {
    fontSize: 30,
    fontWeight: 'bold'
  },

  imageContainer: {
    flex: 0.75,
    width: "40%",
    height: "20%",
    marginLeft: 20,
    marginTop: 30,
    borderRadius: 30
  }



})