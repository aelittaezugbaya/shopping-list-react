import React from 'react';
import jwt_decode from 'jwt-decode';

import LogInForm from './LogInForm';
import Header from './Header';



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


  render (){
    return(
      <div className="container">
        <Header/>
         <LogInForm/>
      </div>
    );
  }
}
