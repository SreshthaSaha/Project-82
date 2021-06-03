import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View ,TouchableOpacity,Modal,KeyboardAvoidingView,ScrollView} from 'react-native';
import React, { Component } from 'react';
import db from '../config';
import firebase from 'firebase';

export default class SignupLoginScreen extends Component {
    constructor(){
        super();
        this.state = {
          password : "",
          emailID : "",
          isModalVisible : false,
          firstName : "",
          lastName:"",
          phoneNumber : "",
          address : "",
          confirmPassword :""    
        }
    }
     showModal = ()=>{
  return(
  <Modal
    animationType="fade"
    transparent={true}
    visible={this.state.isModalVisible}
    >
    <View style={styles.modalContainer}>
      <ScrollView style={{width:'100%'}}>
        <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
        <Text
          style={styles.modalTitle}
          >Registration</Text>
        <TextInput
          style={styles.formTextInput}
          placeholder ={"First Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              firstName: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Last Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              lastName: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Contact"}
          maxLength ={10}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              phoneNumber: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Address"}
          multiline = {true}
          onChangeText={(text)=>{
            this.setState({
              address: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Email"}
          keyboardType ={'email-address'}
          onChangeText={(text)=>{
            this.setState({
              emailID: text
            })
          }}
        /><TextInput
          style={styles.formTextInput}
          placeholder ={"Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        /><TextInput
          style={styles.formTextInput}
          placeholder ={"Confirm Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              confirmPassword: text
            })
          }}
        />
         <View style={styles.modalBackButton}>
  <TouchableOpacity
    style={styles.registerButton}
    onPress={()=>
      this.userSignUp(this.state.emailID, this.state.password, this.state.confirmPassword)
    }
  >
  <Text style={styles.registerButtonText}>Register</Text>
  </TouchableOpacity>
</View>
<View style={styles.modalBackButton}>
  <TouchableOpacity
    style={styles.cancelButton}
    onPress={()=>this.setState({"isModalVisible":false})}
  >
  <Text style={{color:'#001fed'}}>Cancel</Text>
  </TouchableOpacity>
</View>
</KeyboardAvoidingView>
</ScrollView>
</View>
  </Modal>
)
}
    userSignUp = (emailID, password,confirmPassword) =>{
   if(password !== confirmPassword){
       return alert("password doesn't match\Check your password.")
   }else{
     firebase.auth().createUserWithEmailAndPassword(emailID, password)
     .then(()=>{
       db.collection('users').add({
         first_name:this.state.firstName,
         last_name:this.state.lastName,
         phone_number:this.state.phoneNumber,
         email_ID:this.state.emailID,
         address:this.state.address
       })
       return  alert(
            'User Added Successfully',
            '',
            [
              {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
            ]
        );
     })
     .catch((error)=> {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       return alert(errorMessage)
     });
   }
 }
  userLogin = (emailID, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailID, password)
    .then(()=>{
      this.props.navigation.navigate('HomeScreen')
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return alert(errorMessage)
    })
  }
    render(){
        return(
          <View style = {styles.container}>
          <Text style = {styles.title}> Barter </Text>
          <View>
          {this.showModal()}
          </View>
            <View style = {styles.textInputContainer}>
            <TextInput keyboardType ='email-address' placeholder = "Enter email" 
            onChangeText ={(text)=>{
                this.setState ({
                  emailID : text
                })}
            }
            style = {styles.textInput}>
            </TextInput>
            <TextInput  secureTextEntry= {true} placeholder = "Enter password"
            onChangeText ={(text)=>{
              this.setState ({
                password: text
              })}
            } style = {styles.textInput}>
            </TextInput>
            <View style = {styles.buttonContainer}>
              <TouchableOpacity style = {styles.button}onPress = {()=>{this.userSignUp(this.state.emailID, this.state.password)}}> 
              <Text style={styles.buttonText}> Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.button} 
              onPress = {()=>{this.userLogin(this.state.emailID, this.state.password)}}>
                <Text style={styles.buttonText}> Login</Text>
                </TouchableOpacity>
          </View>
          </View>
          </View>
        );
    }
}
const styles = StyleSheet.create({
  container:{
      flex:1,
      backgroundColor:'#c6f8ff'
    },
    textInputContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    },
    textInput:{
        width: 300,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor : '#8999ff',
        fontSize: 20,
          margin:10,
          paddingLeft:10
        },
         button:{
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#2bd4ff",
        marginBottom : 20
         },
         buttonContainer:{
        flex:1,
        alignItems:'center'
      },
      title :{
      fontSize:65,
      fontWeight:'300',
      paddingBottom:30,
      color : '#0206ff',
      alignSelf : "center"
    },
     keyboardAvoidingView:{ 
       flex:1, 
       justifyContent:'center', 
       alignItems:'center',
       }, 
     modalTitle :{ 
       justifyContent:'center', 
       alignSelf:'center', 
       fontSize:30, color:'#00128c', 
       margin:50
       }, 
    modalContainer:{ 
      flex:1, 
      borderRadius:20, 
      justifyContent:'center', 
      alignItems:'center', 
      backgroundColor:"#ffff",
      marginRight:30, 
      marginLeft : 30, 
      marginTop:80,
      marginBottom:80,
     }, 
     formTextInput:{ 
       width:"75%", 
       height:35, 
       alignSelf:'center', 
       borderColor:'#00128c', 
       borderRadius:10, 
       borderWidth:1, 
       marginTop:20, 
       padding:10 
      }, 
    registerButton:{ 
      width:200, 
      height:40,
      alignItems:'center', 
      justifyContent:'center', 
      borderWidth:1, 
      borderRadius:10, 
      marginTop:30 
    }, 
    registerButtonText:{ 
      color:'#00128c', 
      fontSize:15, 
      fontWeight:'bold' 
    }, 
     cancelButton:{ 
       width:200, 
       height:30, 
       justifyContent:'center',
       alignItems:'center', 
       marginTop:5,
       color:"blue" },
    buttonText: {
        fontSize: 20,
        color: "black",
      },
      
})