import * as React from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert, StyleSheet, Keyboard, ToastAndroid } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import Header from '../components/Header'

export default class ExchangeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            userId:firebase.auth().currentUser.email,
            itemName: '',
            itemDescription: ''
        }
    }
    // getUserDetails() {
    //     var userId = firebase.auth().currentUser.email;
    //     db.collection("users").where("email", "==", userId).get().then(snapshot => {
    //         snapshot.forEach(doc => {
    //             var name = doc.data().first_name + " " + doc.data().last_name;
    //             console.log(name)
    //             this.setState({
    //                 username: name,
    //             })
    //         })
    //     })
    // }
    componentDidMount() {
        this.getUserDetails()
    }
    addItem = (name, description) => {
        if (this.state.itemName == '') {
            alert("Enter Item Name");
        }
        else if (this.state.itemDescription == '') {
            alert("Enter Description");
        }
        else {
            var randomId = Math.random().toString(36).substring(7);
            db.collection("exchange_requests").add({
                user_id:this.state.userId,
                item_name: name,
                item_description: description,
                request_id:randomId
            });
            this.setState({
                itemName: '',
                itemDescription: ''
            })
            return Alert.alert("Item Added", "", [{ text: "OK", onPress: () => this.props.navigation.navigate("HomeScreen") }])
        }
    }
    render() {
        return (
            <View>
                <Header title="Exchange Items" />
                <TextInput
                    style={styles.textBox}
                    placeholder="Item Name"
                    onChangeText={(text) => {
                        this.setState({ itemName: text })
                    }}
                    value={this.state.itemName} />

                <TextInput
                    style={styles.textBox}
                    placeholder="Item Description"
                    onChangeText={(text) => {
                        this.setState({ itemDescription: text });
                    }}
                    multiline={true}
                    value={this.state.itemDescription} />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        this.addItem(this.state.itemName, this.state.itemDescription);
                        Keyboard.dismiss()
                    }}>
                    <Text style={styles.buttonText}>
                        Add Item
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textBox: {
        borderBottomWidth: 2,
        borderColor: "#000000",
        margin: 20,
        marginBottom: 10,
        marginTop: 40
    },
    button: {
        borderColor: "black",
        borderWidth: 1,
        margin: 40,
        marginLeft: 120,
        marginRight: 120,
        borderRadius: 10,
        padding: 5
    },
    buttonText: {
        color: "#9996aa",
        textAlign: 'center',
    }
})