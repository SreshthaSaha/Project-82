import React, { Component } from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomeScreen from '../screens/HomeScreen';
import ExchangeScreen from '../screens/ExchangeScreen';

export const TabNavigator = createBottomTabNavigator({
    HomeScreen :{screen: HomeScreen},
    Exchange_Screen :{screen: ExchangeScreen},
   
  })