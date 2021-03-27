import * as React from 'react';
import ExchangeScreen from '../screens/ExchangeScreen';
import HomeScreen from '../screens/HomeScreen';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Image} from 'react-native';
import {Icon} from 'react-native-elements'
export const AppTabNavigator = createBottomTabNavigator({
    HomeScreen : {
      screen: HomeScreen,
      navigationOptions :{
        tabBarIcon : <Icon name = "home"/>,
        tabBarLabel : "Home",
      }
    },
    ExchangeScreen: {
      screen: ExchangeScreen,
      navigationOptions :{
        tabBarIcon : <Icon name = "money"/>,
        tabBarLabel : "Exchange",
      }
    }
  });
  