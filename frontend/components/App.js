import React from 'react';
import jwt_decode from 'jwt-decode';

import MainView from './MainView';
import LogInForm from './LogInForm';
import Header from './Header';
import { socket } from '../common/constants';

export default class App extends React.Component {
  constructor(props){
    super(props);
    if( window.localStorage.accessToken) {
      const jwt = jwt_decode(window.localStorage.accessToken);
      const expired = new Date(jwt.exp * 1000);
      const now = new Date();
  
      if( expired < now) {
        delete window.localStorage.accessToken;
      }
    }
    
    this.state={
      jwt: window.localStorage.accessToken
    }
  }

  componentWillMount(){
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
          : <LogInForm/>}
      </div>
    );
  }
}
