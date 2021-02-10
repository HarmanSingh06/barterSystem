import * as React from 'react';
import { TextInput, Text, View, TouchableOpacity, StyleSheet, Image, ToastAndroid,KeyboardAvoidingView,Keyboard } from 'react-native';
import firebase from 'firebase';
import db from '../config.js';

export default class WelcomeScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: ""
        }
    }
    userSignUp(email, password) {
        if (email == '') {
            //toasts not working.
            ToastAndroid.show("Lets test if this works", ToastAndroid.SHORT);
        }
        else {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
                //use toast android over here
            })
                .catch((error) => {
                    var code = error.code;
                    var message = error.message;
                    return alert(message)
                })
        }
    }
    userSignIn(email, password) {
        if (email == '') {
            //use taost over here also 
        }
        else {
            firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
                //use toast
            })
            .catch((error) => {
                var code = error.code;
                var message = error.message;
                return alert(message)
            })
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior = "padding">
                <Image source={require("../assets/barter.png")} style={{ height: 200, width: 200, marginBottom: 40, marginLeft: 80, marginTop: 60 }} />

                <TextInput keyboardType='email-address' style={styles.loginBox} placeholder="Username" onChangeText={(text) => {
                    this.setState({
                        username: text
                    })
                }} />


                <TextInput secureTextEntry = {true} style={styles.loginBox} placeholder="Password" onChangeText={(text) => {
                    this.setState({
                        password: text
                    })
                }} />

                <TouchableOpacity style={styles.button} onPress={() => {
                    this.userSignIn(this.state.username, this.state.password)
                    Keyboard.dismiss()
                }}>
                    <Text style={{ textAlign: 'center' }} >
                        Sign In
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => {
                    this.userSignUp(this.state.username, this.state.password)
                }}>
                    <Text style={{ textAlign: 'center' }}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
                <Text style={{ marginTop: 140, textAlign: 'center' }}>© No One It's all yours</Text>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    loginBox: {
        width: 250,
        height: 40,
        borderWidth: 1.5,
        fontSize: 20,
        margin: 10,
        paddingLeft: 10,
        marginLeft: 50,
        borderRadius: 20
    },
    button: {
        height: 30,
        width: 90,
        borderWidth: 1,
        marginTop: 20,
        paddingTop: 5,
        borderRadius: 7,
        marginLeft: 135
    }
})