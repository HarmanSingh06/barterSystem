import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';

import {Input,Icon}from 'react-native-elements';
import { RFValue } from "react-native-responsive-fontsize";
import firebase from 'firebase';
import db from '../config';
import { LinearGradient } from 'expo-linear-gradient';
import * as Google from 'expo-google-app-auth';

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      password: '',
      isModalVisible: false,
      firstName: '',
      lastName: '',
      email: '',
      confirmPassword: '',
      passwordError:'',
      isEmailError:''
    };
  }

  userSignUp = (email, password, confirmPassword) => {
    if (password != confirmPassword) {
      alert('Passwords Do Not Match');
    } 
    else if (
      email == '' ||
      password == '' ||
      confirmPassword == '' ||
      this.state.firstName == '' ||
      this.state.lastName == ''
    )
      return alert('Credentials Missing');
    else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          db.collection('users').add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
          });
          return Alert.alert(
            'User Created Successfully',
            'Now you will be automatically signed In',
            [
              {
                text: 'OK',
                onPress: () => {
                  this.setState({
                    isModalVisible: false,
                  });
                  this.userSignIn(this.state.email, this.state.password);
                },
              },
            ]
          );
        })
        .catch((error) => {
          alert(error);
        });
    }
  };
  showModal = () => {
    return (
      <View style={styles.modalView}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.isModalVisible}>
          <KeyboardAvoidingView behavior="padding">
            <ScrollView>
              <Image source = {require("../assets/register.png")} style = {{height:RFValue(200),width:RFValue(200),margin:RFValue(60),opacity:0.5,justifyContent:"center",marginTop:RFValue(410), flex:1,position:"absolute"}}/>
              <Text style={styles.modalHeader}>Registration</Text>
              <Input
              label = {"First Name"}
              labelStyle = {styles.modalLabel}
               leftIcon = {<Icon name = "person"/>}
              inputContainerStyle={{borderBottomWidth:0}}
                style={styles.modalTextInput}
                placeholder="First Name"
                onChangeText={(text) => this.setState({ firstName: text })}
                value={this.state.firstName}
              />

              <Input
              labelStyle = {styles.modalLabel}
              label = {"Last Name"}
               leftIcon = {<Icon name = "person"/>}
              inputContainerStyle={{borderBottomWidth:0}}
                style={styles.modalTextInput}
                placeholder="Last Name"
                onChangeText={(text) => this.setState({ lastName: text })}
                value={this.state.lastName}
              />

              <Input
              labelStyle = {styles.modalLabel}
              label = {"Email"}
               leftIcon = {<Icon name = "email"/>}
              inputContainerStyle={{borderBottomWidth:0}}
                style={styles.modalTextInput}
                keyboardType="email-address"
                placeholder="Email Address"
                onChangeText={(text) => this.setState({ email: text })}
                value={this.state.email}
              />

              <Input
              labelStyle = {styles.modalLabel}
              label = {"Password"}
              leftIcon = {<Icon name = "lock"/>}
              inputContainerStyle={{borderBottomWidth:0}}
                secureTextEntry={true}
                style={styles.modalTextInput}
                placeholder="Password"
                onChangeText={(text) => this.setState({ password: text })}
                value={this.state.password}
              />

              <Input
              labelStyle = {styles.modalLabel}
              label = {"Confirm Password"}
               leftIcon = {<Icon name = "lock"/>}
              inputContainerStyle={{borderBottomWidth:0}}
                secureTextEntry={true}
                style={styles.modalTextInput}
                placeholder="Confirm Password"
                onChangeText={(text) =>
                  this.setState({ confirmPassword: text })
                }
                value={this.state.confirmPassword}
              />

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  this.userSignUp(
                    this.state.email,
                    this.state.password,
                    this.state.confirmPassword
                  );
                }}>
                <Text style={styles.modalButtonText}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  this.setState({
                    isModalVisible: false,
                  });
                }}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    );
  };
  userSignIn = async (email, password) => {
    const {type , user,loginResult} = await Google.logInAsync({
      androidClientId:"1063448750406-v3b4b4rap1nn2ibj6n0k5tij5g6omqlr.apps.googleusercontent.com",
      redirectUrl:"urn:ietf:wg:oauth:2.0:oob"
    })
  if(type == "success"){
    this.props.navigation.navigate("TabNavigator")
  } 
  };
      
    // if (email == '' || password == '') {
    //   alert('Please Fill The Details');
    // } else {
    //   firebase
    //     .auth()
    //     .signInWithEmailAndPassword(email, password)
    //     .then(() => {
    //       this.props.navigation.navigate('TabNavigator');
    //     })
    //     .catch((error)=> {
    //       console.log(error.code)
    //       switch (error.code) {
    //         case 'auth/user-not-found':
    //           this.setState({
    //             isEmailError:"Please Check Your Email Address"
    //           })
    //           break;
    //         case 'auth/uid-already-exists':
    //           alert('Account already in use');
    //           break;
    //         case 'auth/session-cookie-expired':
    //           alert('Session Expired');
    //           break;
    //         case 'auth/project-not-found':
    //           alert('Project Is Deleted');
    //           break;
    //         case 'auth/wrong-password':
    //           this.setState({passwordError:"Please Check Your Password"})
    //           break;
    //       }
    //     });
    // }

  render() {
    return (
      <View style={styles.container}>
{/* <Image source = {require("../assets/player.png")} style = {{position:"absolute",height:RFValue(200),width:RFValue(400),marginTop:RFValue(500),justifyContent:"center",opacity:0.5}}/> */}
          {this.showModal()}
          <Image
            source={require('../assets/yt.png')}
            style={{ height: 54, width: 244, margin: RFValue(20), marginLeft: RFValue(67),marginBottom:RFValue(60) }}
          />

          <Input
            style={styles.textInputBox}
            errorMessage = {this.state.isEmailError}
                       label = {"Email"}
            labelStyle = {styles.label}
            rightIcon = {<Icon name = "email"/>}
            placeholder="Email Address"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                email: text,
              });
            }}
            value={this.state.email}
          />
          <Input
            style={styles.textInputBox}
            errorMessage = {this.state.passwordError}
            label = {"Password"}
            labelStyle = {styles.label}
            rightIcon = {<Icon name = "lock"/>}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
            value={this.state.password}
          />

          <TouchableOpacity
            style={styles.buttons}
            onPress={() => {
              this.userSignIn(this.state.email, this.state.password);
            }}>
            <Text style={styles.buttonsText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttons}
            onPress={() => {
              this.setState({
                isModalVisible: true,
              });
            }}>
            <Text style={styles.buttonsText}>Sign Up</Text>
          </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalLabel:{
    marginLeft:RFValue(25)
  },
  modalButton: {
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    margin: 60,
    borderRadius: 60,
    padding: 7,
    paddingBottom: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  label:{
    fontSize:RFValue(18)
  },
  modalButtonText: {
    textAlign: 'center',
    color: 'white',
  },
  textInputBox: {
    marginLeft:10,
  },
  modalHeader: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 15,
    color: 'black',
    fontWeight:"bold"
  },
  modalView: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'red',
    margin: 20,
    borderRadius: 20,
  },
  modalTextInput: {
    borderWidth: 1,
    margin: 7,
    marginLeft: 10,
    marginRight: 30,
    marginTop: 14,
    padding: 6,
    borderColor: '#ff2244',
    borderRadius: 8,
    paddingLeft: 15,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  buttons: {
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 10,
    borderColor:"white",
    margin: 110,
    borderRadius: 60,
    padding: 7,
    paddingBottom: 8,
    backgroundColor: 'rgba(255,0,0,0.6)',
  },
  buttonsText: {
    textAlign: 'center',
    color: 'white',
  },
});
