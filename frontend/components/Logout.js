import React from 'react';
import {Button} from 'react-bootstrap';
import socketIOClient from "socket.io-client";

export default class Logout extends React.Component{
  constructor(props){
    super(props);
    this.onClick=this.onClick.bind(this);
  }
  onClick(){
    delete window.localStorage.accessToken;
    const endpoint = '/ws';
    const socket = socketIOClient(endpoint);
    socket.emit("logout", window.localStorage.accessToken)
  }
  render(){
    return(
      <div>
        <Button bsStyle="link" className='logout' onClick={this.onClick}>Log out <i className="fa fa-sign-out" aria-hidden="true"></i></Button>
      </div>

    )
  }
}