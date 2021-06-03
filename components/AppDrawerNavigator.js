import { TabNavigator } from './AppTabNavigator';
import {createDrawerNavigator} from 'react-navigation-drawer';
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingsScreen from '../screens/SettingsScreen';
import MyBarters from '../screens/MyBarters'

export const AppDrawerNavigator = createDrawerNavigator({
    Home: {
      screen: TabNavigator
    },
    Settings : {
      screen : SettingsScreen
    },
    MyBarters : {
      screen : MyBarters
    }
    },
    {
      contentComponent : CustomSideBarMenu
    },
    {
     initialRouteName : 'Home' 
  
  })