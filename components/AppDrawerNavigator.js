import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingScreen from '../screens/SettingsScreen';
import MyDonationsScreen from '../screens/MyDonations'
import NotificationScreen from '../screens/NotificationsScreen'
import HomeScreen from '../screens/HomeScreen';


export const AppDrawerNavigator = createDrawerNavigator({
    Home:{
        screen : AppTabNavigator
    },
    Settings:{
        screen: SettingScreen,
    },
    MyDonations:{
      screen:MyDonationsScreen,
    },
    Notifications:{
      screen:NotificationScreen
    },
},
{
    contentComponent:CustomSideBarMenu
},
{
    initialRouteName:'Home'
})