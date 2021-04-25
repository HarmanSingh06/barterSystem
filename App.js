import React from 'react';
import {StatusBar,View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'

//importing screens
import WelcomeScreen from './screens/WelcomeScreen'
import HomeScreen from './screens/HomeScreen';
import SessionsScreen from './screens/SessionsScreen'


//Importing THe Players
import HostPlayer from './screens/HostPlayer'
import ChildPlayer from './screens/ChildPlayer'

import {AppDrawerNavigator} from './components/AppDrawerNavigator';
//importing the navigators
import {AppTabNavigator} from './components/TabNavigator.js';


export default class App extends React.Component{
  render(){
    return(
      <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <AppContainer/>
      </View>
    )
  }
}

const AppNavigator = createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  Drawer:{screen:AppDrawerNavigator},
  HostPlayer:{screen:HostPlayer},
  ChildPlayer:{screen:ChildPlayer},
  TabNavigator:{screen:AppTabNavigator},
});

const AppContainer = createAppContainer(AppNavigator);