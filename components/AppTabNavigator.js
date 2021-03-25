import * as React from 'react';
import ExchangeScreen from '../screens/ExchangeScreen';
import HomeScreen from '../screens/HomeScreen';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Image} from 'react-native';

export const AppTabNavigator = createBottomTabNavigator({
    HomeScreen : {
      screen: HomeScreen,
      navigationOptions :{
        tabBarIcon : <Image source={require("../assets/homeScreen.png")} style={{width:50, height:50}}/>,
        tabBarLabel : "Home",
      }
    },
    ExchangeScreen: {
      screen: ExchangeScreen,
      navigationOptions :{
        tabBarIcon : <Image source={require("../assets/exchangeScreen.png")} style={{width:50, height:35}}/>,
        tabBarLabel : "Exchange",
      }
    }
  });
  