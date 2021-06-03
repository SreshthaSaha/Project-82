import React, { Component } from 'react';
import {View,Text,TouchableOpacity,TextInput,StyleSheet,Alert} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import firebase from 'firebase';

export default class CustomSideBarMenu extends Component{
    render(){
        return(
            <View>
                <View style = {{flex:1 }}>
                    <DrawerItems {...this.props}></DrawerItems>
                </View>
                <View>
                    <TouchableOpacity onPress = {()=>{
                        this.props.navigation.navigate('SignupLoginScreen')
                        firebase.auth().signOut()}}>
                        <Text style={{fontSize: 15,fontWeight: "bold",marginLeft:15}}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}