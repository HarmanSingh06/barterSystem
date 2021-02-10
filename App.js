import * as React from 'react';
import {Text,View} from 'react-native';
import WelcomeScreen from './screens/welcomeScreen.js';
import {AppTabNavigator} from './components/AppTabNavigator';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';


export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}
const SwitchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  TabNavigator:{screen:AppTabNavigator}
})
const AppContainer = createAppContainer(SwitchNavigator)