import * as React from 'react';
import {Text,View} from 'react-native';
import WelcomeScreen from './screens/welcomeScreen.js';
import {AppTabNavigator} from './components/AppTabNavigator';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {AppDrawerNavigator} from './components/AppDrawerNavigator' 
import SettingsScreen from './screens/SettingsScreen'
export default class App extends React.Component{
  render(){
    return(
      <SettingsScreen/>
    )
  }
}
const SwitchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  Drawer:{screen:AppDrawerNavigator},
  TabNavigator:{screen:AppTabNavigator},

})
const AppContainer = createAppContainer(SwitchNavigator)