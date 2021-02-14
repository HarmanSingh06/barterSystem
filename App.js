import * as React from 'react';
import {Text,View} from 'react-native';
import WelcomeScreen from './screens/welcomeScreen.js';
import {AppTabNavigator} from './components/AppTabNavigator';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {AppDrawerNavigator} from './components/AppDrawerNavigator' 

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}
const SwitchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  Drawer:{screen:AppDrawerNavigator},
  TabNavigator:{screen:AppTabNavigator},

})
const AppContainer = createAppContainer(SwitchNavigator)