import * as React from 'react';
import {Text,View} from 'react-native';
import WelcomeScreen from './screens/welcomeScreen.js'


export default class App extends React.Component{
  render(){
    return(
      <WelcomeScreen/>
    )
  }
}