import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import  SettingScreen  from '../screens/SettingScreen'
import CustomSideBarMenu  from './CustomSideBarMenu';
import MyDonationScreen from '../screens/MyDonationScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MyReceivedItemsScreen from '../screens/MyReceivedItemsScreen';
import { Icon } from "react-native-elements";
export const AppDrawerNavigator = createDrawerNavigator({
Barter : {
    screen : AppTabNavigator,
    navigationOptions:{
      drawerIcon : <Icon name="home" type ="fontawesome5" />,

    }
    },
      Settings : {
    screen : SettingScreen,   
    navigationOptions:{
      drawerIcon : <Icon name="settings" type ="fontawesome5" />,
      drawerLabel : "Settings"
    }
    },
    MyDonations : {
      screen : MyDonationScreen,
      navigationOptions:{
        drawerIcon : <Icon name="gift" type ="fontawesome5" />,
        drawerLabel : "MyDonations"
      }
    },
    Notifications : {
      screen : NotificationScreen,
      navigationOptions:{
        drawerIcon : <Icon name="bell" type ="fontawesome5" />,
        drawerLabel : "Notifications"
      }
    },
   ReceivedItems  : {
      screen : MyReceivedItemsScreen,
      navigationOptions:{
        drawerIcon : <Icon name="gift" type ="fontawesome5" />,
        drawerLabel : "ReceivedItems"
      }
    },
  },
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Barter'
  })