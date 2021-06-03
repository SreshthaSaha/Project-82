import { StyleSheet, Text, TextInput, View ,TouchableOpacity,Modal,KeyboardAvoidingView,ScrollView} from 'react-native';
import React, { Component } from 'react';
import db from '../config';
import firebase from 'firebase';
import {Card ,Header} from 'react-native-elements';

export default class ReceiverDetails extends Component {
    constructor(){
        super();
        this.state = {        
            userId :  firebase.auth.currentUser.email,
            item_description : this.props.navigation.getParam('details')["item_description"],
            userName : '', 
            item_name:'',
            exchanger_name:'',
            exchanger_contact:'' , 
            exchanger_address:'' , 
            exchange_Id:'',
            exchange_status:''
        }
    }
    addBarters=()=>{
        var message = this.state.exchanger_name + " has shown interest in exchanging the item"
        db.collection("MyBarters").add({
          "item_name": this.state.item_name,
          "item_description":this.state.item_description,
          "exchanger_name": this.state.exchanger_name,
          "exchanger_contact" : this.state.exchanger_contact,
          "exchanger_address": this.state.exchanger_address,
          "exchange_Id": this.state.exchange_Id,
          "date": firebase.firestore.FieldValue.serverTimestamp(),
          "exchange_status" : "unread",
        })      
    }
    getReceiverDetails(){
        db.collection('users').where('email_id','==',this.state.recieverId).get()
        .then(snapshot=>{
          snapshot.forEach(doc=>{
            this.setState({
              recieverName    : doc.data().first_name,
              recieverContact : doc.data().contact,
              recieverAddress : doc.data().address,
            })
          })
        });
    }
    render(){
      return(
        <View style={styles.container}>
            <View style={{flex:0.1}}>
              <Header
                centerComponent={{ text:"UserDetails", style: { color: '#000000', fontSize:20,fontWeight:"bold", } }}
                backgroundColor = "#07d1ff"
              />
            </View>
            <View style={{flex:0.3}}>
              <Card
                  title={"Item Details"}
                  titleStyle= {{fontSize : 20}}>
                  <Card>
                      <Text style={{fontWeight:'bold'}}>Name : {this.state.item_name}</Text>
                  </Card>
                  <Card>
                      <Text style={{fontWeight:'bold'}}>Description : {this.state.item_description}</Text>
                  </Card>
              </Card>
            </View>
            <View style={{flex:0.3}}>
              <Card
                title={"Reciever Information"}
                titleStyle= {{fontSize : 20}}>
                  <Card>
                    <Text style={{fontWeight:'bold'}}>Name: {this.state.exchanger_name}</Text>
                  </Card>
                  <Card>
                    <Text style={{fontWeight:'bold'}}>Contact: {this.state.exchanger_contact}</Text>
                  </Card>
                  <Card>
                    <Text style={{fontWeight:'bold'}}>Address: {this.state.exchanger_address}</Text>
                  </Card>
                  <Card>
                    <Text style={{fontWeight:'bold'}}>ID: {this.state.exchange_Id}</Text>
                  </Card>
              </Card>
            </View>       
            <View>
              <TouchableOpacity onPress={()=>{
                    this.addBarters()
                    this.props.navigation('MyBartes')
                  }}>
                  <Text>Exchange</Text>
              </TouchableOpacity>
            </View>                
        </View>
      )
    }
    
}