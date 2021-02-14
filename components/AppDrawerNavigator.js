import * as React from 'react';
import CustomSidebarMenu from './customSideBarMenu';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator'

export const AppDrawerNavigator = createDrawerNavigator({
    Home:{
        screen:AppTabNavigator
    }
},
{
    contentComponent:CustomSidebarMenu
},
{
    initialRouteName:"Home"
})