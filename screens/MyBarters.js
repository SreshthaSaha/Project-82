import { StyleSheet, Text, TextInput, View ,TouchableOpacity,Modal,KeyboardAvoidingView,ScrollView,FlatList} from 'react-native';
import React, { Component } from 'react';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class MyBarters extends Component {
    constructor(){
        super();
        this.state = {        
            allBarters: []
        }
        this.requestRef= null
    }
    getAllBarters =()=>{
        this.requestRef = db.collection("MyBarters")
        .onSnapshot((snapshot)=>{
          var allBarters = snapshot.docs.map(document => document.data());
          this.setState({
            allBarters : allBarters,
          });
        })
      }
      keyExtractor = (item, index) => index.toString()

      renderItem = ( {item, i} ) =>(
        <ListItem
          key={i}
          title={item.item_name}
          subtitle={"Requested By : " + item.exchanger_name +"\nStatus : " + item.request_status}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          bottomDivider
        />
      )

      componentDidMount(){
        this.getAllBarters()
      }
   
      componentWillUnmount(){
        this.requestRef();
      }
    render(){
        return(
            <View>
                <View>
                    <MyHeader title = "My Barters" navigation = {this.props.navigation}/>
                </View>
                <View style={{flex:1}}>
                    {this.state.allBarters.length === 0 ?(
                        <View style={styles.title}>
                            <Text style={{ fontSize: 20}}>List of all barters</Text>
                        </View>
                    ):(
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.allBarters}
                            renderItem={this.renderItem}
                        />
                    )}
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    title :{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    }
  })