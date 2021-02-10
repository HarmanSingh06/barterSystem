import * as React from 'react';
import { TextInput, Text, View, TouchableOpacity, StyleSheet, Image, ToastAndroid, KeyboardAvoidingView, Keyboard, Modal, ScrollView } from 'react-native';
import firebase from 'firebase';
import db from '../config.js';

export default class WelcomeScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
        }
    }
    userSignUp=(email, password, confirmPassword)=> {
        if (email == '') {
            //toasts not working.
            ToastAndroid.show("A pikachu appeared nearby !", ToastAndroid.SHORT);
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

    userSignIn=(email, password)=> {
        if (email == '') {
            alert("Please Enter Your Email")
        }
        else {
            firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
                alert("User Added Successfully");
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
            
            <KeyboardAvoidingView behavior="padding">
                <Image source={require("../assets/barter.png")} style={{ height: 200, width: 200, marginBottom: 40, marginLeft: 80, marginTop: 60 }} />

                <TextInput keyboardType='email-address' style={styles.loginBox} placeholder="Username" onChangeText={(text) => {
                    this.setState({
                        username: text
                    })
                }} />

                <TextInput secureTextEntry={true} style={styles.loginBox} placeholder="Password" onChangeText={(text) => {
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

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {this.userSignUp(this.state.username,this.state.password)}}
                >
                    <Text style={{textAlign:'center'}}>Sign Up</Text>
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
    },
    container: {
        flex: 1,
        backgroundColor: '#F8BE85',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 65,
        fontWeight: '300',
        paddingBottom: 30,
        color: '#ff3d00'
    },
    loginBox: {
        width: 300,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor: '#ff8a65',
        fontSize: 20,
        margin: 10,
        paddingLeft: 10
    },
    KeyboardAvoidingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalTitle: {
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 30,
        color: '#000000',
        margin: 20
    },
    modalContainer: {
        flex: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffff",
        marginRight: 30,
        marginLeft: 30,
        marginTop: 80,
        marginBottom: 80,
    },
    formTextInput: {
        width: "75%",
        height: 35,
        alignSelf: 'center',
        borderColor: '#000000',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        padding: 10
    },
    registerButton: {
        width: 200,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 30
    },
    registerButtonText: {
        color: '#ff5722',
        fontSize: 15,
        fontWeight: 'bold'
    },
    cancelButton: {
        width: 200,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    buttonText: {
        color: '#ffff',
        fontWeight: '200',
        fontSize: 20
    }
})