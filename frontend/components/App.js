import React from 'react';
import MainView from './MainView';
import LogInForm from './LogInForm';
import Header from './Header';
import socketIOClient from "socket.io-client";
import {endpoint} from '../common/constants';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      jwt:window.localStorage.accessToken
    }
  }
  componentWillMount(){
    const socket = socketIOClient(endpoint);
    socket.on("open list", data => {
      this.setState({
        jwt:data
      })
    });
    socket.on('close list',data=>{
      this.setState({
        jwt:window.localStorage.accessToken
      })
    })
  }

  render (){
    let {jwt} = this.state;
    return(
      <div className="container">
        <Header/>
        {jwt
          ? <MainView/>
            :<LogInForm/>}
      </div>
    );
  }
}