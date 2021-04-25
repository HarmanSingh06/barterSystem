import * as React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Image} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SessionsScreen from '../screens/SessionsScreen';
import DrawerNavigator from './AppDrawerNavigator';

export const AppTabNavigator  = createBottomTabNavigator({
    HomeScreen:{
        screen:HomeScreen,
        navigationOptions:{
            tabBarLabel:"Home"
        }
    },
    SessionsScreen:{
        screen:SessionsScreen,
        navigationOptions:{
            tabBarLabel:"Sessions",

        }
    },
});