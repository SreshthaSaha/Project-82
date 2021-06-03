import React, { Component} from 'react';
import {Header,Icon} from 'react-native-elements'

export default class MyHeader extends Component{
  render(){
  return(
    <Header
    leftComponent = {<Icon name='bars' type='font-awesome' color='#0000ff' onPress={() => this.props.navigation.toggleDrawer()}/>}
      centerComponent={{ text: this.props.title, style: { color: '#070093', fontSize:20,fontWeight:"bold", } }}      
      backgroundColor = "#00fcd2"
    />
  );
}
}