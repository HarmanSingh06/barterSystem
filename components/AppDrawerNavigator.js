import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './TabNavigator';
import CustomSidebarMenu from './CustomDrawerNavigator';


export const AppDrawerNavigator = createDrawerNavigator({
  Home:{
    screen:AppTabNavigator
  }
},
{
  contentComponent:CustomSidebarMenu
},
{
  initialRouteName:'Home'
})