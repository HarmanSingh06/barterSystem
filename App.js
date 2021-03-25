import * as React from 'react';
import {View,StatusBar} from 'react-native'
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {AppDrawerNavigator} from './components/AppDrawerNavigator';
import WelcomeScreen from './screens/WelcomeScreen';
import {AppTabNavigator} from './components/AppTabNavigator.js'
import {AppStackNavigator} from './components/AppStackNavigator';

export default class App extends React.Component{
  render(){
    return(
      <SafeAreaProvider style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <AppContainer/>
      </SafeAreaProvider>
    )
  }
}

const SwitchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  Drawer:{screen: AppDrawerNavigator},
  StackNavigator:{screen:AppStackNavigator},
  TabNavigator:{screen:AppTabNavigator},
})

const AppContainer = createAppContainer(SwitchNavigator)