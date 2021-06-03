import React from 'react';
import {View,Text,StyleSheet ,SafeAreaProvider} from 'react-native';
import SignupLoginScreen from './screens/SignupLoginScreen';
import {AppDrawerNavigator} from './components/AppDrawerNavigator';
import {createSwitchNavigator,createAppContainer} from 'react-navigation';

export default function App () {
    return (
       <AppContainer />     
    );
}
const switchNavigator = createSwitchNavigator({
  WelcomeScreen : {
    screen : SignupLoginScreen 
  },
    AppDrawerNavigator : AppDrawerNavigator
})

const AppContainer = createAppContainer (switchNavigator)





