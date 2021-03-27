import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingScreen from '../screens/SettingsScreen';
import MyDonationsScreen from '../screens/MyDonations'
import NotificationScreen from '../screens/NotificationsScreen'
import HomeScreen from '../screens/HomeScreen';
import {Icon} from 'react-native-elements';

export const AppDrawerNavigator = createDrawerNavigator({
    Home:{
        screen : AppTabNavigator,
        navigationOptions:{
            drawerIcon:<Icon name = "home"/>
        }
    },
    Settings:{
        screen: SettingScreen,
        navigationOptions:{
            drawerIcon:<Icon name = "settings"/>
        }
    },
    MyDonations:{
      screen:MyDonationsScreen,
      navigationOptions:{
          drawerIcon:<Icon name = "person"/>,
          drawerLabel:"My Donations"
      }
    },
    Notifications:{
      screen:NotificationScreen,
      navigationOptions:{
          drawerIcon:<Icon name = "watch"/>
      }
    },
},
{
    contentComponent:CustomSideBarMenu
},
{
    initialRouteName:'Home'
})