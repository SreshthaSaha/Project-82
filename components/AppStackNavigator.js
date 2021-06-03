import React, { Component } from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import AppDrawerNavigator from './AppDrawerNavigator';
import ReceiverDetails from '../screens/ReceiverDetails'

export const AppStackNavigator = createStackNavigator({
    AppDrawerNaviagtor : {
        screen : AppDrawerNavigator,
        navigationOptions : {
            headerShown : false
        }
    },
    ReceiverDetails : {
        screen : ReceiverDetails,
    },
},
     { initialRouteName:'Drawer'       
        }  
)