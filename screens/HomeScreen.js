import { StyleSheet, Text, TextInput, View ,TouchableOpacity,Modal,KeyboardAvoidingView,ScrollView,FlatList} from 'react-native';
import React, { Component } from 'react';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class HomeScreen extends Component {
    constructor(){
        super();
        this.state = {
            requestedObjectList :[]
        }
    }
    getRequestedObjectList =()=>{
        this.requestRef = db.collection("Users")
        .onSnapshot((snapshot)=>{
          var requestedObjectList = snapshot.docs.map(document => document.data());
          this.setState({
            requestedObjectList : requestedObjectList
          });
        })
      }
      componentDidMount(){
        this.getRequestedObjectList()
      }
      renderItem = ( {item, i} ) =>{
        return (
          <ListItem
            key={i}
            title={item.item_name}
            subtitle={item.description}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            rightElement={
                <TouchableOpacity style={styles.button}>
                  <Text style={{color:'#ffff'}}>Exchange</Text>
                </TouchableOpacity>
              }
            bottomDivider
          />
        )
      }
    render(){
        return(
            <View>
              <MyHeader title = "Barter App" navigation = {this.props.navigation}/>
                <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedObjectList}
                renderItem={this.renderItem}
              />
            </View>
        )
    }
}