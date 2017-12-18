import React, { Component } from 'react';
import io from 'socket.io-client';
import { USER_CONNECTED } from '../Events';

const socketUrl = "http://192.168.56.1:4321"
export default class Layout extends Component{

  constructor(props){
    super(props);
    this.state ={
      socket:null
      user:null
    };
  }

  componentWillMount() {
    this.initSocket()
  }

  initSocket = ()=>{
    const socket = io(socketUrl)

    socket.on('connect', ()=>{
      console.log('connected');
    })
    this.setState({socket})
  }

  setUser = (user)=>{
    const { socket } =this.state
    socket.emit(USER_CONNECTED);
    this.setState({user})
  }

  logout = function(){
    const { socket } = this.state
    socket.emit(LOGOUT)
    this.setState({user:null})
  }

  render(){
    const { title } = this.props
    return(
      <div className="container">
      {title}

      </div>
    );
  }
}
