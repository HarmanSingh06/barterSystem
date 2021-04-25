import React from 'react';
import {DrawerItems} from 'react-navigation-drawer';
import {StyleSheet, View, Text,TouchableOpacity} from 'react-native';

export default class CustomSidebarMenu extends React.Component{
  render(){
    return(
      <View>
      <DrawerItems {...this.props}/>
      </View>
    )
  }
}

